import { openDB, type IDBPDatabase } from 'idb';
export class IDBStorage {
  private dbName: string;
  private storeName: string;
  private dbPromise: Promise<IDBPDatabase>;

  constructor(dbName: string, storeName: string) {
    this.dbName = dbName;
    this.storeName = storeName;

    this.dbPromise = openDB(this.dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      },
    });
  }

  async getItem(key: string): Promise<string | null> {
    return this.dbPromise.then((db) => db.get(this.storeName, key));
  }
  async setItem(key: string, value: string) {
    return this.dbPromise.then((db) => db.put(this.storeName, value, key));
  }
  async removeItem(key: string): Promise<void> {
    return this.dbPromise.then((db) => db.delete(this.storeName, key));
  }
}
