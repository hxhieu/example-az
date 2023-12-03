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

t.test("it should return a decode token", async (t) => {
  // Mock the db
  const mockDb = createMockDb(t);

  // Execute
  const decoded = await decode("aaa", mockDb);

  // Since encode/decode is random, we can only expect a none empty string
  t.not(decoded, "");
});
