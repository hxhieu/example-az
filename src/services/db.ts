import { createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { tokenizerSchema } from "./tokenizer";

let db: RxDatabase;

const init = async () => {
  db = await createRxDatabase({
    name: "in-memory",
    storage: getRxStorageMemory(),
  });

  await db.addCollections({
    tokenizer: {
      schema: tokenizerSchema,
    },
  });
};

const store = async <T>(obj: T): Promise<void> => {
  return db.collections.tokenizer.insert(obj);
};

const retrieve = async <T>(query: any): Promise<T | undefined | null> => {
  return db.collections.tokenizer.findOne(query).exec();
};

export { init, store, retrieve };
