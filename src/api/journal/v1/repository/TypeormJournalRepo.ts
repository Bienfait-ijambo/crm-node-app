import { IJournalDto } from "../domain-model/dto/IjournalDto";
import {
  IBalanceReportInput,
  ICreateGeneralLedgerInput,
  IEarningVsExpenseInput,
  IJournalReportInput,
  IJournalSearchInput,
  IJournalServiceInput,
  IPreviousTreasureOp,
  ITransactionDetailInput,
  IUpdateJournalInput,
} from "../domain-model/usecases/interfaces/journalInterfaces";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { Journal, JournalTransactionType } from "../../../../entities/Journal";
import { catchError } from "../../../../shared/exceptions/CachError";
import { DB } from "../../../common/db/DB";
import { IExpenseVsEarnings, IJournalRepo } from "./IJournalRepo";
import { enumMassType } from "../../../../entities/Mass";
import { getPreviousDate } from "../../../../shared/util/util";
import { Account } from "../../../../entities/Account";
import { ApiResponse } from "../../../common/types/apiResponse";

export class TypeormJournalRepo implements IJournalRepo {
  private db = new DB<Journal>(Journal);

  @catchError
  public async recordTransaction(input: IJournalDto[]) {
    const result = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Journal)
      .values(input)
      .execute();

    return result;
  }

  @catchError
  async saveIntoJournalService(input: IJournalServiceInput) {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into("journal_services_service")
      .values({
        journalId: input.journalId,
        serviceId: input.serviceId,
      })
      .execute();
  }

  @catchError
  async getGeneralLedger(input: ICreateGeneralLedgerInput) {
    const PAGE_SIZE = 10;


    const result = await AppDataSource.getRepository(Journal)
      .createQueryBuilder("journal")
      .leftJoinAndSelect("journal.account", "account")
      .select("SUM(CAST(journal.amount AS FLOAT))", "totalAmount")
      .addSelect("journal.transactionType", "transactionType")
      .addSelect("journal.accountId", "accountId")
      .addSelect("account.name", "accountName")
      .addSelect("account.code", "accountCode")
      .groupBy("journal.transactionType")
      .addGroupBy("journal.accountId")
      .addGroupBy("account.name")
      .addGroupBy("account.code")
      .having("SUM(CAST(journal.amount AS FLOAT)) > 0")
      .where("journal.accountId IN(:...accountIds)", {
        accountIds: input.accountId,
      })
      .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
        date1: input.startDate,
        date2: input.endDate,
      })
      .andWhere("journal.userId = :userId", { userId: input.userId })
      .skip((input.page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getRawMany();

    return result;
  }

  @catchError
  private async countDataInjournal(
    input: IBalanceReportInput
  ): Promise<number> {
    const result = await AppDataSource.getRepository(Journal)
      .createQueryBuilder("journal")
      .select("COUNT(journal.id)", "count")
      .groupBy("journal.accountId, journal.userId")
      .having("SUM(CAST(journal.amount AS FLOAT)) > 0")
      .where("journal.createdAt BETWEEN :date1 AND :date2", {
        date1: input.startDate,
        date2: input.endDate,
      })
      .andWhere("journal.userId = :userId", { userId: input.userId })
      .getRawMany();

    return result.length > 0 ? result.length : 0;
  }

  @catchError
  async getBalance( input: IBalanceReportInput ): Promise<ApiResponse<"journals", Journal[]>> {
    const PAGE_SIZE = 10;
    const result: Journal[] = await AppDataSource.getRepository(Journal)
      .createQueryBuilder("journal")
      .leftJoinAndSelect("journal.account", "account")
      .leftJoinAndSelect("account.accountType", "accountType")
      .leftJoinAndSelect("account.mass", "mass")
      .select("SUM(CAST(journal.amount AS FLOAT))", "totalAmount")
      .addSelect("SUM(CAST(journal.income AS FLOAT))", "totalIncome")
      .addSelect("SUM(CAST(journal.expense AS FLOAT))", "totalExpense")
      .addSelect("journal.accountId", "accountId")
      .addSelect("account.name", "accountName")
      .addSelect("account.code", "accountCode")
      .addSelect("journal.userId", "userId")
      .addSelect("accountType.name", "accountType")
      .addSelect("mass.name", "massName")
      .groupBy("journal.accountId")
      .addGroupBy("journal.userId")
      .addGroupBy("account.name")
      .addGroupBy("account.code")
      .addGroupBy("accountType.name")
      .addGroupBy("mass.name")
      .having("SUM(CAST(journal.amount AS FLOAT)) > 0")
      .where("journal.createdAt BETWEEN :date1 AND :date2", {
        date1: input.startDate,
        date2: input.endDate,
      })
      .andWhere("journal.userId = :userId", { userId: input.userId })
      .offset((input.page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .getRawMany();

    const count = await this.countDataInjournal(input);
    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { journals: result, count, totalPages };
  }

  @catchError
  async GetTransactions(
    input: IJournalSearchInput
  ): Promise<ApiResponse<'journals',Journal[]>> {
    const PAGE_SIZE = 10;

    // let projectName = name.toLowerCase();

    const [journals, count] = await AppDataSource.getRepository(Journal)
      .createQueryBuilder("journal")
      .leftJoinAndSelect("journal.account", "account")
      .leftJoinAndSelect("account.accountType", "accountType")
      .andWhere("journal.userId = :userId", { userId: input.userId })
      .orderBy("journal.id", "DESC")
      .skip((input.page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { journals, count, totalPages };
  }

  @catchError
  async GetJournalPdfData(
    input: IJournalReportInput
  ): Promise<{ journals: Journal[] }> {
    const query = AppDataSource.getRepository(Journal)
      .createQueryBuilder("journal")
      .leftJoinAndSelect("journal.account", "account")
      .select([
        "account.code",
        "account.id",
        "account.name",
        "journal.amount",
        "journal.createdAt",
        "journal.description",
        "journal.transactionCode",
        "journal.transactionType",
      ])
      .where("journal.createdAt BETWEEN :date1 AND :date2", {
        date1: input.startDate,
        date2: input.endDate,
      })
      .andWhere("journal.userId = :userId", { userId: input.userId });

    if (input.projectId > 0) {
      query.andWhere("journal.projectId = :projectId", {
        projectId: input.projectId,
      });
    }

    if (input.serviceId > 0) {
      query.andWhere("journal.serviceId = :serviceId", {
        serviceId: input.serviceId,
      });
    }

    const [journals] = await query.getManyAndCount();

    return { journals };
  }

  @catchError
  async EditTransaction(
    input: IUpdateJournalInput
  ): Promise<IUpdateJournalInput> {
    const { id, ...restInput } = input;
    const result = await this.db.update(restInput, id);

    if (!result) throw new Error("transaction not found !");

    return input;
  }

  @catchError
  async getTransactionDetailByAccount(input: ITransactionDetailInput) {
    const PAGE_SIZE = 10;

    const query = AppDataSource.getRepository(Journal)
      .createQueryBuilder("journal")
      .select([
        "journal.id",
        "journal.amount",
        "journal.transactionType",
        "journal.description",
        "journal.createdAt",
      ])
      .where("journal.accountId = :accountId", { accountId: input.accountId })
      .andWhere("journal.userId = :userId", { userId: input.userId })
      .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
        date1: input.startDate,
        date2: input.endDate,
      });

    if (input.projectId > 0) {
      query.andWhere("journal.projectId = :projectId", {
        projectId: input.projectId,
      });
    }

    if (input.serviceId > 0) {
      query.andWhere("journal.serviceId = :serviceId", {
        serviceId: input.serviceId,
      });
    }

    const [transactions, count] = await query
      .orderBy("journal.id", "DESC")
      .skip((input.page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { transactions, count, totalPages };
  }

  @catchError
  async getPreviousTreasuryOp(input: IPreviousTreasureOp) {
    const credit = JournalTransactionType.CREDIT;
    const debit = JournalTransactionType.DEBIT;
    const massId = enumMassType.TRESORERIE_ACTIF;

    const previousDate = getPreviousDate(input.currDate, 16);

    const result = await AppDataSource.getRepository(Account)
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.journals", "journal")
      .select(
        "SUM(CASE WHEN account.massId = :massId AND journal.transactionType=:credit THEN CAST(journal.amount AS FLOAT) ELSE 0 END)",
        "totalCreditAmount"
      )
      .addSelect(
        "SUM(CASE WHEN account.massId = :massId AND journal.transactionType=:debit THEN CAST(journal.amount AS FLOAT) ELSE 0 END)",
        "totalDebitAmount"
      )
      .addSelect("journal.createdAt", "createdAt")
      .where("account.massId IN (:...accountMassIds)", {
        accountMassIds: [massId, massId],
      })
      .andWhere("journal.userId = :userId", { userId: input.userId })
      .andWhere("journal.createdAt BETWEEN :date1 AND :date2", {
        date1: previousDate,
        date2: input.currDate,
      })
      .setParameters({ massId, credit, debit })
      .groupBy("journal.createdAt")
      .getRawMany();

    return result;
  }

  @catchError
  async expensesVsEarnings(
    input: IEarningVsExpenseInput
  ): Promise<IExpenseVsEarnings> {
    const massId = enumMassType.TRESORERIE_ACTIF;
    const credit = JournalTransactionType.CREDIT;
    const debit = JournalTransactionType.DEBIT;

    const result = await AppDataSource.getRepository(Journal)
      .createQueryBuilder("journal")
      .leftJoinAndSelect("journal.account", "account")
      .select(
        "SUM(CASE WHEN account.massId = :massId AND journal.transactionType=:credit THEN CAST(journal.amount AS FLOAT) ELSE 0 END)",
        "totalExpenses"
      )
      .addSelect(
        "SUM(CASE WHEN account.massId = :massId AND journal.transactionType=:debit THEN CAST(journal.amount AS FLOAT) ELSE 0 END)",
        "totalEarnings"
      )
      .where("account.massId IN (:...accountMassIds)", {
        accountMassIds: [massId, massId],
      })

      .andWhere("journal.userId = :userId", { userId: input.userId })
      .andWhere("journal.createdAt = :createdAt", {
        createdAt: input.createdAt,
      })
      .setParameters({ massId, credit, debit })
      .getRawOne();

    if (result.totalExpenses == null) {
      return { totalExpenses: 0, totalEarnings: 0 };
    }

    return result;
  }
}

export const journalRepo = new TypeormJournalRepo();
