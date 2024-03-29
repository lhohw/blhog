import { Pool } from "pg";

class DBPool {
  private static uniqueInstance: Pool | null = null;
  private constructor() {}
  static async getInstance() {
    if (!DBPool.uniqueInstance) {
      DBPool.uniqueInstance = new Pool();
      await DBPool.uniqueInstance.connect();
    }
    return DBPool.uniqueInstance;
  }
}

export default DBPool;
