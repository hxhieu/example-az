import t from "tap";
import * as db from "../../src/services/db";
import { encode, decode } from "../../src/services/tokenizer";

const createMockDb = (t: any) =>
  // @ts-ignore
  t.createMock(db, {
    store: async <T>(obj: T): Promise<void> => {},
    retrieve: async <T>(query: any): Promise<T | undefined | null> => undefined,
  });

t.test("it should return a encode token", async (t) => {
  // Mock the db
  const mockDb = createMockDb(t);

  // Execute
  const encoded = await encode("aaa", mockDb);

  // Since encode/decode is random, we can only expect a none empty string
  t.not(encoded, "");
});

t.test("it should generate 100,000 unique tokens", async (t) => {
  // Mock the db
  const mockDb = createMockDb(t);

  // Execute
  const tokens = await Promise.all(
    Array.from(Array(100000).keys()).map((i) => encode(`item-${i}`, mockDb))
  );

  const uniqTokens = [...new Set(tokens)];

  // Result all unique
  t.equal(tokens.length, uniqTokens.length);
});

t.test("it should return a decode token", async (t) => {
  // Mock the db
  const mockDb = createMockDb(t);

  // Execute
  const decoded = await decode("aaa", mockDb);

  // Since encode/decode is random, we can only expect a none empty string
  t.not(decoded, "");
});
