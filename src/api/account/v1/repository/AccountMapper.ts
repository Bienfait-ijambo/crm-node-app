import { IAccountDto } from "../domain-model/dto/IAccount";
import { Account } from "../../../../entities/Account";
import { IAccountRepo } from "./IAccountRepo";



export class AccountMapper{

    public static toDto(account: Account) :Omit<IAccountDto,'userId'>{
        return {
          id: +account.id,
          name: account.name,
          code:account.code,
          typeId:account.accountTypeId,
          massId:account.massId,
          
         
        };
      }
}