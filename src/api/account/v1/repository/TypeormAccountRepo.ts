import { IAccountDto } from "../domain-model/dto/IAccount";
import { AccountSearchType, ICreateUpdateAccountInput, searchAccountInput } from "../domain-model/usecases/interfaces/accountInterfaces";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { Account, defaultUserId } from "../../../../entities/Account";
import { catchError } from "../../../../shared/exceptions/CachError";
import { DB } from "../../../common/db/DB";
import { AccountMapper } from "./AccountMapper";
import { IAccountRepo } from "./IAccountRepo";
import { enumAccountType } from "../../../../entities/AccountType";
import { enumMassType } from "../../../../entities/Mass";
import { AggregateAccountAmount } from "../../../../entities/AggregateAccountAmount";

export class TypeormAccountRepo implements IAccountRepo {
  private db = new DB<Account>(Account);

  @catchError
  async createAccount(input: Account): Promise<Omit<IAccountDto,'userId'>> {
    const result = await this.db.save(input);
    return AccountMapper.toDto(result);
  }

  @catchError
  async findAccountByCode(code: string,userId:number): Promise<Account> {
    const result = await AppDataSource.getRepository(Account)
    .createQueryBuilder('account')
    .where(`account.code = :accountCode`, {accountCode:code})
    .andWhere(`account.userId = :userId`, {userId:userId})
    .getOne()
  
  
    return result ? result : null;
  }

  @catchError
  async getAccounts(input:searchAccountInput ): Promise<{ accounts: Account[]; count: number; totalPages: number }> { 
 

    const PAGE_SIZE = 8;

    let name = input.accountName.toLowerCase();
 

  const query =  AppDataSource.getRepository(Account)
      .createQueryBuilder("account")
      .leftJoinAndSelect("account.accountType", "accountType")
      .leftJoinAndSelect("account.mass", "mass")

      
      if(input.searchType===AccountSearchType.CODE){
        query.where("account.code LIKE :accountCode", {accountCode : `%${input.code}%` })
      }

      if(input.searchType===AccountSearchType.TEXT){
        query.where("lower(account.name) LIKE :accountName", {accountName: `%${name}%` })
      }

    
      const [accounts, count]=await query.andWhere('(account.userId = :userId OR account.userId = :defaultUserId)', {
        userId: input.userId,
        defaultUserId: defaultUserId.userId
      })
      .skip((input.page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { accounts, count, totalPages };
  }

  /**
   * 
   * @param input 
   * @returns input
   * checks update an account in accountTable and remove an account in aggregate-accountTable if doesnt satisfy the condition
   */
  @catchError
  async updateAccount(input: ICreateUpdateAccountInput) {

 
    const result = await this.db.update({
      name:input.name,
      code:input.code,
      accountTypeId:input.typeId,
      massId:input.massId,
    }, input.id);

    if(input.typeId!==enumAccountType.ACTIF && input.massId!==enumMassType.TRESORERIE_ACTIF){

      //remove account from aggregate_account_table
         this.removeAccountFromAggregateAccountTable(input.id)

    }

    if (!result) throw new Error("Désolez, nous n'avons pas trouvé ce code !");

    return input;
  }


   async removeAccountFromAggregateAccountTable(accountId:number):Promise<void>{
    await AppDataSource.createQueryBuilder()
    .delete()
    .from(AggregateAccountAmount)
    .where("accountId = :accountId", { accountId: accountId })
    .execute();
  }
}

export const accountRepo = new TypeormAccountRepo();
