import { PeriodicTfrResult } from "../../../entities/PeriodicTfrResult";
import { TfrResultAccount } from "../../../entities/TfrResultAccount";
import { Tfr } from "../../../entities/Trf";
import { AppDataSource } from "../../../infrastructure/typeorm/data-source";
import { catchError } from "../../../shared/exceptions/CachError";
import { ApiResponse } from "../../common/types/apiResponse";
import { IGetTfrDataInput, createPeriodicResultInput } from "../domain-model/usecases/interfaces/tfr.interfaces";
import { IGetPeriodTfrResult, ITFRRepo } from "./ITFRRepo";

export class TypeormTFRRepo implements ITFRRepo {


  @catchError
 async createPeriodicTfrResult(input:createPeriodicResultInput){
  const result=await  AppDataSource.getRepository(PeriodicTfrResult).save(input)
  return result
 }

 @catchError
   async getPeriodTfrResult( input:IGetPeriodTfrResult ):Promise<ApiResponse<'periodicData',PeriodicTfrResult[]>> {
    const PAGE_SIZE = 10;

    const [periodicData,count] = await AppDataSource.getRepository(PeriodicTfrResult)
      .createQueryBuilder("periodic_tfr_result")
      // .where("lower(service.name) LIKE :serviceName", { serviceName: `%${serviceName}%` })
      .where('periodic_tfr_result.userId = :userId', { userId:input.userId})
      .orderBy('periodic_tfr_result.id','DESC')
      .skip((input.page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

   
    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { periodicData, count, totalPages};
  }
 

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
