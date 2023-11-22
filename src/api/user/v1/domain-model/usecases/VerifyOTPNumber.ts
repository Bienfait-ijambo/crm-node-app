import { IUserRepo } from "../../repository/IUserRepo";
import { VerifyOTPNumberInput } from "./interfaces/userInterfaces";

export class VerifyOTPNumberUseCase {


    constructor(private repo:IUserRepo){
        this.repo = repo;
    }

    public async execute(input:VerifyOTPNumberInput):Promise<boolean>{
        const result = await this.repo.IsValidOptNumber(input)
        return result ? true : false;
    }
}