export interface ITypeDto{
    id:number
    name:string
    massId:number
}


export enum AccountTypes{
    ACTIF=1,
    PASSIF=2,
    PRODUIT=3,
    CHARGE=4,
}