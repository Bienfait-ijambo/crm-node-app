import {
  journalTransactionNameType,
  journalTransactionValType,
} from "../../../../../entities/Journal";
import { resultTypeNameType } from "../../../../../entities/Trf";
import { AccountCODE, AccountName, TfrAccount } from "../../../../../shared/types/brandTypes";
import { Maybe } from "../../../../../shared/types/myTypes";

export interface GrossMarginInput {
  chargeAccount: {
    code: Maybe<number>;
    amount: number;
    accountName:AccountName
    transactionType: {
      name: journalTransactionNameType;
      val: journalTransactionValType;
    };
  };
  profitAccount: {
    code: Maybe<number>;
    amount: number;
    accountName:AccountName
    transactionType: {
      name: journalTransactionNameType;
      val: journalTransactionValType;
    };
  };
  periodCode: string;
  userId: number;
}

export interface ValueAddedInput {
  tfrResultType: AccountCODE;
  account: AccountCODE;
  resultType:Maybe<resultTypeNameType>
  amount: number;
  accountName:AccountName
  transactionType: number;
  userId: number;
  periodCode: string;
}

export  interface IGetTfrDataInput{
  periodCode:string,
  userId:number
}

export interface createPeriodicResultInput{
  name: string;
  resultDate: string;
  status:number
  userId: number;

}