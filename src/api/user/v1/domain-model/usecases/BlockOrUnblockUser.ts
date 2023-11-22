import { IUserRepo } from "../../repository/IUserRepo";


export interface blockUserInput{
    status:boolean,userCode:string
}

export class BlockOrUnblockUser{

    constructor(private repo:IUserRepo){
        this.repo = repo;
    }

    async execute(input:blockUserInput){
        if(input.status){
            const result= await this.repo.blockUser(input.userCode)
            return result
        }else{
            const result= await this.repo.unBlockUser(input.userCode)
            return result
        }
    }
}