import { IProjectDto } from "../../Dto/IProjectDto";

export interface ICreateProjectInput extends Omit<IProjectDto,'id'>{}

export interface IUpdateProjectInput extends Omit<IProjectDto,'userId'>{}


export interface IGetProjectIdAndNameInput{
    designation:string;
    userId:number
    page:number
}


export interface IAffectProjectAmountInput{
    userId:number
    projectId:number
    amount:string
    status:boolean
}