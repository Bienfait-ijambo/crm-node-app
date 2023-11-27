import {
  journalTransactionNameType,
  journalTransactionValType,
} from "../../../../../entities/Journal";
import { TfrAccount } from "../../../../../shared/types/brandTypes";
import { Maybe } from "../../../../../shared/types/myTypes";

export interface GrossMarginInput {
  chargeAccount: {
    code: Maybe<number>;
    amount: number;
    transactionType: {
      name: journalTransactionNameType;
      val: journalTransactionValType;
    };
  };
  profitAccount: {
    code: Maybe<number>;
    amount: number;

    transactionType: {
      name: journalTransactionNameType;
      val: journalTransactionValType;
    };
  };
  period: string;
  userId: number;
}

export interface ValueAddedInput {
  tfrResultType: TfrAccount;
  account: TfrAccount;
  amount: number;
  transactionType: number;
  userId: number;
  period: string;
}