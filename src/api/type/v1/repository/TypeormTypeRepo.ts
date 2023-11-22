import { ICreateUpdateInput } from "../../../account/v1/domain-model/usecases/interfaces/accountInterfaces";
import { ITypeDto } from "../domain-model/dto/ITypeDto";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import {
  AccountType,
  enumAccountType,
  existingAccountTypes,
} from "../../../../entities/AccountType";
import { catchError } from "../../../../shared/exceptions/CachError";
import { DB } from "../../../common/db/DB";
import { ITypeRepo } from "./ITypeRepo";
import { TypeMapper } from "./TypeMapper";
import { IBilanInput } from "../domain-model/usecases/interfaces/typeInterfaces";
import { Mass } from "../../../../entities/Mass";

export class TypeormTypeRepo implements ITypeRepo {
  private db = new DB<AccountType>(AccountType);

  @catchError
  async getAccountTypesWithMasses() {

    const result = await AppDataSource.getRepository(AccountType)
    .createQueryBuilder("account_type")
    .leftJoinAndSelect("account_type.masses", "mass")
    .orderBy("account_type.id", 'ASC')
    .getMany()

    return result
  }

  async createType(input: AccountType): Promise<Omit<ITypeDto, "massId">> {
    const result = await this.db.save(input);
    return TypeMapper.toDto(result);
  }

  @catchError
  async createAccounTypeMass(typeId: number, massId: number) {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into("account_type_masses_mass")
      .values({
        accountTypeId: typeId,
        massId: massId,
      })
      .execute();
  }

  @catchError
  async accountTypeHasMass(accountTypeId: number, massId: number) {
    const result = await AppDataSource.createQueryBuilder()
      .select()
      .from("account_type_masses_mass", "at")
      .where("at.accountTypeId = :accountTypeId", {
        accountTypeId: accountTypeId,
      })
      .andWhere("at.massId = :massId", { massId: massId })
      .execute();

    return result.length == 0 ? false : true;
  }

  @catchError
  async updateAccounTypeMass(accountTypeId: number, massId: number) {
    const result = await AppDataSource.createQueryBuilder()
      .update("account_type_masses_mass")
      .set({ accountTypeId: accountTypeId, massId: massId })
      .where("accountTypeId = :accountTypeId", {
        accountTypeId: +accountTypeId,
      })
      .andWhere("massId = :massId", { massId: +massId })
      .execute();

    return result;
  }

  @catchError
  async updateType(input: ICreateUpdateInput): Promise<ICreateUpdateInput> {
    const { id, name } = input;

    const result = await AppDataSource.createQueryBuilder()
      .update(AccountType)
      .set({ name: name })
      .where("id = :id", { id: +id })
      .execute();

    if (!result) throw new Error("Ce Type n'existe pas !");

    return input;
  }

  @catchError
  async getTypeByName(name: string) {
    const result = await this.db.repo
      .createQueryBuilder("account_type")
      .where(`account_type.name = :name`, { name: name })
      .getOne();

    return result == null ? false : result;
  }

  @catchError
  async getTypeByNameAndMassId(name: string, massId: number): Promise<Boolean> {
    const result = await this.db.repo
      .createQueryBuilder("account_type")
      .where(`account_type.name = :name`, { name: name })
      .andWhere(`account_type.massId = :massId`, { massId: massId })
      .getOne();

    return result == null ? false : true;
  }

  @catchError
  async getBilan(input: IBilanInput) {
    const PAGE_SIZE = 20;

    const [masses, count] = await AppDataSource.getRepository(Mass)
      .createQueryBuilder("mass")
      .leftJoinAndSelect("mass.account", "account")
      .leftJoinAndSelect("account.accountType", "accountType")
      .leftJoinAndSelect("account.journals", "journal")
      .select(['mass.id','mass.name','account.code','account.name','account.id','journal.id','journal.transactionType','journal.amount'])
      .where("accountType.id IN(:...Ids)", {
        Ids: [enumAccountType.ACTIF, enumAccountType.PASSIF],
      })
      .andWhere("journal.userId = :userId", { userId: input.userId })
      .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
        date1: input.startDate,
        date2: input.endDate,
      })
      .orderBy("journal.id", "DESC")
      .skip((input.page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { masses, count, totalPages };
  }


  @catchError
  async getResultAccount(input: IBilanInput) {
    const PAGE_SIZE = 20;


    const [masses, count] = await AppDataSource.getRepository(Mass)
      .createQueryBuilder("mass")
      .leftJoinAndSelect("mass.account", "account")
      .leftJoinAndSelect("account.accountType", "accountType")
      .leftJoinAndSelect("account.journals", "journal")
      .select(['mass.id','mass.name','account.code','account.name','account.id','journal.id','journal.transactionType','journal.amount'])
      .where("accountType.id IN(:...Ids)", {
        Ids: [enumAccountType.CHARGES, enumAccountType.PRODUIT],
      })
      .andWhere("journal.userId = :userId", { userId: input.userId })
      .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
        date1: input.startDate,
        date2: input.endDate,
      })
      .orderBy("journal.id", "DESC")
      .skip((input.page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { masses, count, totalPages };
  }
}

/**
 * account type
 */
export const TypeRepo = new TypeormTypeRepo();
