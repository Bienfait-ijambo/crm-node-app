import { IAccountRepo } from "../../repository/IAccountRepo";
import {  searchAccountInput } from "./interfaces/accountInterfaces";

export class GetAccountUseCase{

    constructor(private repo:IAccountRepo){
        this.repo = repo;
    }

    async execute(input:searchAccountInput){

        const result = await this.repo.getAccounts(input)
        return result
    }
}