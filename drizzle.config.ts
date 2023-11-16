import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

export default {
  schema: "./src/db/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    password: process.env.PGPASSWORD!,
    host: process.env.PGHOST!,
    user: process.env.PGUSER!,
    database: process.env.PGDATABASE!,
    ssl: true,
  },
} satisfies Config;
