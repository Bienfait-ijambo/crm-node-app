import { aggregateUpdateInput } from "../../journal/v1/domain-model/usecases/interfaces/journalInterfaces"
import { AggregateAccountDto } from "../domain-model/dto/AggregateAccountDto"
import { IGetTreasuryAccountInput } from "../usecases/interfaces/aggregateAccountInterfaces"

export interface returnTypeAggregateAccount{
    id:number
    accountId:number
    totalAmount:string
    userId:number
}

export interface IAggregateAccountRepo{

    checkIfAccountExists(accountId:number[],userId:number):Promise<returnTypeAggregateAccount[]>


    recordData(input:AggregateAccountDto[])

    updateData(input: aggregateUpdateInput)

    getTreasuryAccount(input:IGetTreasuryAccountInput)



}


