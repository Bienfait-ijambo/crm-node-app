import { EnterpriseInfo } from "../../../../../entities/EnterpriseInfo";
import { redisClient } from "../../../../../infrastructure/services/redisService";
import { catchError } from "../../../../../shared/exceptions/CachError";
import { IUserRepo } from "../../repository/IUserRepo";

export class GetUserEnterpriseInfoUseCase {
  constructor(private repo: IUserRepo) {
    this.repo = repo;
  }

  @catchError
  async execute(userId: number): Promise<EnterpriseInfo> {
    const data = await this.getCacheData(userId);
    return data;
  }

  /**
   *
   * @param userId
   * get data from cache(Redis) or in database
   */
  @catchError
  private async getCacheData(userId: number): Promise<EnterpriseInfo> {
    // const result = await redisClient.get(`enterpriseInfo:${userId}`);

  
    // if (result!==null) {
     
    //   const data: EnterpriseInfo = JSON.parse(result);
    //   return data;
    // } else {
      const result = await this.repo.getUserEnterpiseInfo(userId);

      //set data in cache
      // await redisClient.set( `enterpriseInfo:${userId}`, `${JSON.stringify(result)}` );

      return result;
    // }
  }
}
