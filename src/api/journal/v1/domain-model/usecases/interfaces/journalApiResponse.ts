export interface IJournalApiResponse {
    id:              number;
    description:     string;
    amount:          string;
    transactionType: number;
    transactionCode: string;
    income:          string;
    draw:            boolean;
    expense:         string;
    createdAt:       Date;
    account:         Account;
}

export interface Account {
    id:          number;
    name:        string;
    code:        string;
    accountType: AccountType;
    mass:        IMass;
}

export interface AccountType {
    id:   number;
    name: string;
}


export interface IMass{
    id:number;
    name:string;
}