import { logErrorToFile } from "../graphql-server/winston/logger";
import { AppDataSource } from "./data-source";

export default async function createDBConnection() {
  try {
   const db= await AppDataSource.initialize();
   console.log('database connection established....')
    logErrorToFile("db-started...", "db-started");
    return db
  } catch (error) {
    console.log("failed to connect to database : " + error);
    logErrorToFile( `failed to connect to database ${error.message}`, "db-error-msg");
  }
}
