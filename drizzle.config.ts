import { defineConfig } from "drizzle-kit";
import * as config from "./config.js";

// Use the config variables directly
const databaseUrl = config.DATABASE_URL;

// Validate DATABASE_URL
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in the config file");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
