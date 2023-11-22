import {
  ACCOUNT_TYPE_SEED_DATA,
  AccountType,
  existingAccountTypes,
} from "../../../../entities/AccountType";
import { MASSES, Mass } from "../../../../entities/Mass";
import { AppDataSource } from "../../data-source";

export async function seedMass() {
  try {
    const result = await AppDataSource.getRepository(Mass).count();

    if (result === 0) {
      const arr = MASSES;
      for (let i = 0; i < arr.length; i++) {
        await AppDataSource.createQueryBuilder()
          .insert()
          .into("mass")
          .values({
            name: arr[i].name,
            status: arr[i].status,
          })
          .execute();
      }
    } else {
      console.log("Already seed---> mass !!");
    }
  } catch (error) {
    console.log("seed-error---> mass");
  }
}

export async function seedAccountType() {
  try {
    const result = await AppDataSource.getRepository(AccountType).count();

    if (result === 0) {
      const arr = ACCOUNT_TYPE_SEED_DATA;
      for (let i = 0; i < arr.length; i++) {
        await AppDataSource.createQueryBuilder()
          .insert()
          .into("account_type")
          .values({
            name: arr[i].name,
            status: arr[i].status,
          })
          .execute();
      }
    } else {
      console.log("already seed--> accountType !!");
    }
  } catch (error) {
    console.log("seed-error::==> account_type");
  }
}

export async function attribAccountTypeMasses() {
  try {
    const result = await AppDataSource.createQueryBuilder()
      .select()
      .from("account_type_masses_mass", "alias")
      .getCount();

    if (result === 0) {
      for (let i = 0; i < existingAccountTypes.length; i++) {
        const accountTypeId = existingAccountTypes[i].id;

        for (let j = 0; j < existingAccountTypes[i].masses.length; j++) {
          await AppDataSource.createQueryBuilder()
            .insert()
            .into("account_type_masses_mass")
            .values({
              accountTypeId: accountTypeId,
              massId: existingAccountTypes[i].masses[j].id,
            })
            .execute();
        }
      }
    } else {
      console.log("already seed ---> account_type_masses_mass !!");
    }
  } catch (error) {
    console.log(" error  :-->account_type_masses_mass----> contrait violation");
  }
}
