import { IAccountDto } from "../domain-model/dto/IAccount";
import {  ICreateUpdateAccountInput, searchAccountInput } from "../domain-model/usecases/interfaces/accountInterfaces";
import { Account } from "../../../../entities/Account"

export interface IAccountRepo{

  //signup
  createAccount(input:Account): Promise<Omit<IAccountDto,'userId'>>

 
  findAccountByCode(code:string,userId:number): Promise<Account> 


  getAccounts(input:searchAccountInput):Promise<{ accounts: Account[]; count: number,totalPages:number }>


  updateAccount(input:ICreateUpdateAccountInput)



  removeAccountFromAggregateAccountTable(accountId:number):Promise<void>

  
}