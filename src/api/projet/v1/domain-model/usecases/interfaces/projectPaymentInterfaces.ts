export interface IcreateProjectPayementInput {
  projectId: number;
  amount: string;
  userId: number;
}

export interface IGetTotalPaidInput {
  projectId: number;
  userId: number;
}
