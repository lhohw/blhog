// import { Pool } from "pg";
import { VercelPoolClient, db } from "@vercel/postgres";

class DBPool {
  private static uniqueInstance: VercelPoolClient | null = null;
  private constructor() {}
  static async getInstance() {
    if (!DBPool.uniqueInstance) {
      DBPool.uniqueInstance = await db.connect();
    }
    return DBPool.uniqueInstance;
  }
}

export default DBPool;
