import { IJournalDto } from "../../dto/IjournalDto";

export interface ICreateJournalInput extends Omit<IJournalDto,'id'>{}

export interface IUpdateJournalInput extends Omit<IJournalDto,'userId'>{}


export interface IDateFilterInput{
    startDate: string;
    endDate: string;
}

export interface IJournalSearchInput{
    accountName:string;
    projectId:number;
    transactionType:number;
    date:string
    userId:number
    page:number
}


export interface ICreateTreasuryInput{
    accountId:number
    totalAmount:string
    userId:number
}

export interface ICreateGeneralLedgerInput extends IDateFilterInput{
    accountName:string
    transactionType:number
    projectId:number
    accountId:Array<number>
    userId:number
    page:number
}


export interface IJournalReportInput extends IDateFilterInput{
    projectId:number;
    serviceId:number
    userId:number
    journalName:string
}



export interface IBalanceReportInput extends IDateFilterInput{
    page:number
    // projectId:number;
    // transactionType:number;
    userId:number
}

export interface aggregateUpdateInput{
    id:number
    accountId:number
    userId:number
    totalAmount:number
}
export interface IExpenseInput{
    userId:number
}
export interface IEarningVsExpenseInput{
    userId:number
    createdAt:string
}

export interface IJournalServiceInput{
    serviceId:number
    journalId:number
}


export interface ITransactionDetailInput{
    // projectId:number
    // serviceId:number
    userId:number
    startDate:string
    endDate:string
    accountId:number
    accountName:string 
    accountCode:string
    // page:number
}

/**
 * previous date treasury operation
 */
export interface IPreviousTreasureOp{
userId:number
currDate:Date
}