import { IUserRepo } from "../../repository/IUserRepo";



export class GetUserPermission{


    constructor(private repo:IUserRepo){
        this.repo = repo;
    }

    async execute(){
        const result=await this.repo.getUserPermissions()
        return result
    }
}