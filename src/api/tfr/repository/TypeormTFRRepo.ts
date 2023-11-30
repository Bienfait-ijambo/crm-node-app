import { TfrResultAccount } from "../../../entities/TfrResultAccount";
import { Tfr } from "../../../entities/Trf";
import { AppDataSource } from "../../../infrastructure/typeorm/data-source";
import { catchError } from "../../../shared/exceptions/CachError";
import { IGetTfrDataInput } from "../domain-model/usecases/interfaces/tfr.interfaces";
import { ITFRRepo } from "./ITFRRepo";

export class TypeormTFRRepo implements ITFRRepo {
  @catchError
  async createTfrResulatAccount(
    input: TfrResultAccount
  ): Promise<TfrResultAccount> {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(TfrResultAccount)
      .values(input)
      .execute();

    return input;
  }

  @catchError
  public async createTFr(input: Tfr[]): Promise<Tfr[]> {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Tfr)
      .values(input)
      .execute();

    return input;
  }


  @catchError
  async getTfrData(input:IGetTfrDataInput): Promise<Tfr[]>{
 
   const result = await AppDataSource.getRepository(Tfr)
   .createQueryBuilder("tfr")
   .where("tfr.period =:period", { period: input.period })
   .andWhere("tfr.userId = :userId", { userId: input.userId })
   .getMany()
   return  result
 
  }

  
}

export const tfrRepo = new TypeormTFRRepo();
