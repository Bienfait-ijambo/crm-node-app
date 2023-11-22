
export interface IJournalDto {
  id: number;
  accountId: number;
  massId:number
  accountType: number;
  description: string;
  createdAt: string;
  projectId: number;
  serviceId:number
  amount: string;
  transactionType: number;
  income: string;
  expense: string;
  draw:boolean
  transactionCode:string
  userId: number;
}
