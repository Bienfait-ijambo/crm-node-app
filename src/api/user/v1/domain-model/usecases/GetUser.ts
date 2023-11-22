
import { propertyIsValidNumber } from "../../../../common/error/propertyIsValidNumber";
import { IUserRepo } from "../../repository/IUserRepo";


/**
 * get a sigle user
 */
export class GetUserUseCase{


    constructor(private repo:IUserRepo){
        this.repo = repo
    }

    public async execute(id:number){
        propertyIsValidNumber(id,"Id")
        const user = await this.repo.getUser(id)
        return user
    }
}