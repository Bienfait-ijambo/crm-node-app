export interface ICreateAccountInput{
    name: string;
    code:string;
    typeId:number;
    massId:number
    userId:number
}


export interface ICreateUpdateAccountInput extends Omit<ICreateAccountInput,'userId'>{
   id:number
}
export interface ICreateUpdateInput extends ICreateAccountInput {
    id:number;
 }

 export interface IGetAccountInput extends ICreateAccountInput{
    page:number
 }



 export enum AccountSearchType{
   CODE=1,
   TEXT=2,
 }
 export interface searchAccountInput{
   userId:number
    accountName:string
    page:number
    code:string
    searchType:AccountSearchType
 }