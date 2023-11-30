import * as dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "../data-source";
import createDBConnection from "../connection";
import { pageActions } from "../../../config/page/PageActions";
import {
  attribAccountTypeMasses,
  seedAccountType,
  seedMass,
} from "./accounts/accountSeed";
import { logErrorToFile } from "../../graphql-server/winston/logger";
import { clientPages } from "../../../entities/ClientPages";

async function seedPageActions() {
  const count = await AppDataSource.getRepository(clientPages).count();

  if (count === 0) {
    for (let i = 0; i < pageActions.length; i++) {
      await AppDataSource.createQueryBuilder()
        .insert()
        .into("client_pages")
        .values({
          pageName: pageActions[i],
        })
        .execute();
    }
  } else {
    console.log("already seed ---> client_pages");
  }
}

const runSeed = async () => {
  try {
    await createDBConnection();

    await Promise.all([seedMass(), seedAccountType()]);

    await attribAccountTypeMasses();

    // seedPageActions();
    console.log("seed completed");

    process.exit()
  } catch (error) {
    console.log("seed-error", error.message);
    logErrorToFile(error, "seed-error");
  }
};

runSeed();
