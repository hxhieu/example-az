type Db = typeof import("./db");

const encode = async (raw: string, db: Db): Promise<string> => {
  await db?.store("");
  throw new Error("encode not implemented");
};

const decode = async (encoded: string, db: Db): Promise<string> => {
  await db?.retrieve({});
  throw new Error("decode not implemented");
};

export { encode, decode };
