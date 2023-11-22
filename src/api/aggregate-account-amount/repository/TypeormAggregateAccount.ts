import { enumAccountType } from "../../../entities/AccountType";
import { AggregateAccountAmount } from "../../../entities/AggregateAccountAmount";
import { enumMassType } from "../../../entities/Mass";
import { AppDataSource } from "../../../infrastructure/typeorm/data-source";
import { catchError } from "../../../shared/exceptions/CachError";
import { aggregateUpdateInput } from "../../journal/v1/domain-model/usecases/interfaces/journalInterfaces";
import { AggregateAccountDto } from "../domain-model/dto/AggregateAccountDto";
import { IGetTreasuryAccountInput } from "../usecases/interfaces/aggregateAccountInterfaces";
import {
  IAggregateAccountRepo,
  returnTypeAggregateAccount,
} from "./IAggregateAccountRepo";

export class TypeormAggregateAccount implements IAggregateAccountRepo {
  @catchError
  async recordData(input: AggregateAccountDto[]) {
 
    const result = await AppDataSource.createQueryBuilder()
      .insert()
      .into(AggregateAccountAmount)
      .values(input)
      .execute();
    return result;
  }

  @catchError
  async checkIfAccountExists( accountId: number[], userId: number ): Promise<returnTypeAggregateAccount[]> {

   
    const result = await AppDataSource.getRepository(AggregateAccountAmount)
      .createQueryBuilder("aggregate_account_amount")
      .addSelect("aggregate_account_amount.id", "id")
      .addSelect("aggregate_account_amount.totalAmount", "totalAmount")
      .addSelect("aggregate_account_amount.userId", "userId")
      .addSelect("aggregate_account_amount.accountId", "accountId")
      .where("aggregate_account_amount.accountId IN(:...accountIds)", {
        accountIds: accountId,
      })
      .andWhere("aggregate_account_amount.userId = :userId", { userId: userId })
      .getRawMany();
    return result;
  }

  @catchError
  async updateData(input: aggregateUpdateInput) {
    await AppDataSource.createQueryBuilder()
      .update(AggregateAccountAmount)
      .set({ totalAmount: input.totalAmount })
      .where("id = :id", { id: input.id })
      .andWhere("accountId = :accountId", { accountId: input.accountId })
      .andWhere("userId = :userId", { userId: input.userId })
      .execute();
  }

  @catchError
  async getTreasuryAccount(input: IGetTreasuryAccountInput) {

    const result = await AppDataSource.getRepository(AggregateAccountAmount)
      .createQueryBuilder("aggregate_account_amount")
      .leftJoinAndSelect('aggregate_account_amount.account', 'account')
      .select([
        "account.name AS accountname",
        "account.code AS accountcode",
        "aggregate_account_amount.totalAmount AS totalamount",
      ])
      .where("account.massId = :massId", { massId: enumMassType.TRESORERIE_ACTIF })
      .andWhere("account.accountTypeId = :accountTypeId", { accountTypeId:  enumAccountType.ACTIF})
      .andWhere("aggregate_account_amount.userId = :userId", { userId: input.userId })
      .getRawMany();

      return result
  }
}
export const aggregateAccountRepo = new TypeormAggregateAccount();
