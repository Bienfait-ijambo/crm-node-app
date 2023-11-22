import { ITypeRepo } from "../../repository/ITypeRepo";

export class GetAccountTypesWithMass{

    constructor(private repo:ITypeRepo){
        this.repo = repo;
    }

    async execute(){

        const result = await this.repo.getAccountTypesWithMasses()
      
        return result
    }
}