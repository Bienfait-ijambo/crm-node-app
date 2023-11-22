

// import { redisClient } from "../../../../../infrastructure/services/redisService";
import { catchError } from "../../../../../shared/exceptions/CachError";
import { propertyIsValidNumber } from "../../../../common/error/propertyIsValidNumber";
import { IUserRepo } from "../../repository/IUserRepo";
import {  UploadUserEnterpriseLogoInput } from "./interfaces/userInterfaces";

export class UploadUserEnterpriseLogoUseCase  {

 

  constructor( private repo: IUserRepo) {
    this.repo = repo
  }

  public async execute(input:UploadUserEnterpriseLogoInput){
    propertyIsValidNumber(input.userId,'userId')
    const result =  this.repo.uploadEnterpriseLogo(input)

    // const removeCache= this.removeDataFromCache(input.userId)

    const [uploadResult]=await Promise.all([result])
    return uploadResult
  }


  // @catchError
  // private async removeDataFromCache(userId:number):Promise<void>{
  //     redisClient.del(`enterpriseInfo:${userId}`);
  // }


}
