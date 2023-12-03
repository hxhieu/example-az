const store = async <T>(obj: T): Promise<void> => {
  throw new Error("store not implemented");
};

const retrieve = async <T>(query: any): Promise<T | undefined> => {
  throw new Error("retrieve not implemented");
};

export { store, retrieve };
