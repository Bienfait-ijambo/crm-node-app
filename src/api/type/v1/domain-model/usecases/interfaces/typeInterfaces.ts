import { ITypeDto } from "../../dto/ITypeDto";

export interface ICreateTypeInput extends Omit<ITypeDto,'id'>{

}


export interface IUpdateTypeInput extends ITypeDto{}



export interface IBilanInput{
    page:number;
    userId:number
    startDate:string
    endDate:string
}


export interface ICreateAccountResultInput extends IBilanInput{}