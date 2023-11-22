import { IServiceDto } from "../../dto/IServiceDto";


export interface ICreateServiceInput extends Omit<IServiceDto,'id'>{}

export interface IUpdateServiceInput extends Omit<IServiceDto,|'userId'>{}

export interface IServicePaymentInput{
    userId:number,
     page: number
     date:string
}