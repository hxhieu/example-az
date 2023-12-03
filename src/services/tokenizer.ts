import type { FromSchema } from "json-schema-to-ts";
import { nanoid } from "nanoid";

const tokenizerSchema = {
  version: 0,
  primaryKey: "token",
  type: "object",
  properties: {
    token: {
      type: "string",
      maxLength: 100,
    },
    // raw input string
    raw: {
      type: "string",
    },
  },
  required: ["id", "token"],
} as const;

type Db = typeof import("./db");
type TokenStore = FromSchema<typeof tokenizerSchema>;

const encode = async (raw: string, db: Db): Promise<string> => {
  // Try to retrieve existing persistent first
  const existing = await db.retrieve<TokenStore>({
    selector: {
      raw,
    },
  });
  if (existing) {
    return existing.token;
  }

  const id = nanoid();

  await db.store<TokenStore>({
    id,
    raw,
    token: id,
  });

  return id;
};

const decode = async (
  encoded: string,
  db: Db
): Promise<string | undefined | null> => {
  const entry = await db.retrieve<TokenStore>({
    selector: {
      token: encoded,
    },
  });
  return entry?.raw;
};

export { encode, decode, tokenizerSchema };
