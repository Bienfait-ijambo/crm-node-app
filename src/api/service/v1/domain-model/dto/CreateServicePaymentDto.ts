import { ServicePayment } from "../../../../../entities/ServicePayment";
import { isNumber } from "../../../../common/customer-decorators/Number";


export interface IServicePaymentDto {
  amount: string;
  serviceId: number;
  userId: number;
  createdAt?:string
}
export enum paymentServiceStatus{
  GAIN=1,
  EXPENSE=0,
  NO_GAIN_AND_NO_EXPENSE=2,

}
export class CreateServicePaymentDto {
  @isNumber
  protected amount: string;

  @isNumber
  protected serviceId: number;

  @isNumber
  protected userId: number;

  protected createdAt?:string

  constructor(input: IServicePaymentDto) {
    this.amount = input.amount;
    this.serviceId = input.serviceId;
    this.userId = input.userId;
    this.createdAt = input.createdAt;
  }

  public getInput_Without_Date(status:number) {
    return{
      serviceId:this.serviceId,
      amount:this.amount,
      userId:this.userId,
      status:status
    }
  }

  public getInput_With_Date(status:number) {
    return{
      serviceId:this.serviceId,
      amount:this.amount,
      userId:this.userId,
      status:status,
      createdAt:this.createdAt
    }
  }
}
