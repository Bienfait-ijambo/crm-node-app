// import { redisClient } from "../../../../../infrastructure/services/redisService"; 
import { catchError } from "../../../../../shared/exceptions/CachError";
import { IUserRepo } from "../../repository/IUserRepo";
import { CreateEnterpiseDto } from "../domain/CreateEnterpriseDto";
import { EnterPriseInfoInput } from "./interfaces/userInterfaces";




export class CreateEnterpiseInfoUseCase{


    constructor(private repo:IUserRepo){
        this.repo = repo;
    }

    @catchError
    async execute(input:EnterPriseInfoInput){
       
        const dto=new CreateEnterpiseDto(input)
     
        const result= await this.repo.createEnterpriseInfo(dto.getInput())

        // await this.removeDataFromCache(input.userId)
        
        return result
    }


    // @catchError
    // private async removeDataFromCache(userId:number):Promise<void>{
    //    await redisClient.del(`enterpriseInfo:${userId}`);
    // }


   


}