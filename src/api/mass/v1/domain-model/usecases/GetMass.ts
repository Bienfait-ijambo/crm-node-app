import { IMassRepo } from "../../repository/IMassRepo";


export class GetMassUseCase{

    constructor(private repo:IMassRepo){
        this.repo = repo;
    }

    async execute(){

       const result=await this.repo.getMass()
        return result
    }
}