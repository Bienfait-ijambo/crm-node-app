import { IAggregateAccountRepo } from "../repository/IAggregateAccountRepo";
import { IGetTreasuryAccountInput } from "./interfaces/aggregateAccountInterfaces";

export class GetTreasuryAccountUseCase{


    constructor(private repo:IAggregateAccountRepo){
        this.repo = repo;
    }

    async execute(input: IGetTreasuryAccountInput){
        const result=await this.repo.getTreasuryAccount(input)
        return result
    }
}