import { logErrorToFile } from "../graphql-server/winston/logger";
import { AppDataSource } from "./data-source";

export default async function createDBConnection() {
  try {
    AppDataSource.initialize();
    logErrorToFile("db-started...", "db-started");
    console.log("Database started successfully !");
  } catch (error) {
    console.log("database error: " + error.message);
    logErrorToFile("Failed to connect to the DB : ", "db-error-msg");
  }
}
