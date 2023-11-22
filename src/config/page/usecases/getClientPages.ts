import { redisClient } from "../../../infrastructure/services/redisService";
import { catchError } from "../../../shared/exceptions/CachError";
import { IPageRepo } from "../typeorm/IPageRepo";

export class GetClientPagesUseCase {
  constructor(private repo: IPageRepo) {
    this.repo = repo;
  }

  async execute() {
    const data = await this.getDataFromCache();
    return data;
  }

  @catchError
  private async getDataFromCache() {
    const cacheData = await redisClient.get(`clientPages`);
 

    if (cacheData != null) {
      const data = JSON.parse(cacheData);
    
      return data;
    } else {
      const dbResult = await this.repo.getPages();

      //set data in cache
      await redisClient.set(`clientPages`, `${JSON.stringify(dbResult)}`);


      return dbResult;
    }
  }
}
