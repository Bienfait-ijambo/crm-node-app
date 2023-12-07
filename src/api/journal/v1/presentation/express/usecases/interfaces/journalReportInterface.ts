



export interface IJournalTransaction {
    description: string;
    transactionCode:string
    idOp:        string;
    operations:  Operation[];
}

export interface Operation {
    credit: Credit;
    debit:  Credit;
}

export interface Credit {
    accountCode: number | string;
    amount:      string;
    name:        string;
}



export interface IJournalReportApiRes {
    account: {
      accountTypeId: number;
      code: number;
      createdAt: string;
      deletedAt: null | string;
      id: number;
      massId: number;
      name: string;
      status: number;
      updatedAt: string;
    };
    accountId: number;
    amount: string;
    createdAt: string;
    deletedAt: null | string;
    description: string;
    draw: boolean;
    expense: string;
    id: number;
    income: string;
    transactionCode: string;
    transactionType: number;
    updatedAt: string;
    userId: number;
  }
  