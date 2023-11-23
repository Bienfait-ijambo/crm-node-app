import { TfrResultAccount } from "../../../entities/TfrResultAccount";
import { Tfr } from "../../../entities/Trf";
import { AppDataSource } from "../../../infrastructure/typeorm/data-source";
import { catchError } from "../../../shared/exceptions/CachError";
import { ITFRRepo } from "./ITFRRepo";



export class TypeormTFRRepo implements ITFRRepo{

   async createGrossMargin(input: TfrResultAccount): Promise<TfrResultAccount> {
    await AppDataSource.createQueryBuilder()
    .insert()
    .into(TfrResultAccount)
    .values(input)
    .execute();

  return input;
    }


    @catchError
    public async createGrossMarginOperation(input: Tfr[]) :Promise<Tfr[]>{
     await AppDataSource.createQueryBuilder()
        .insert()
        .into(Tfr)
        .values(input)
        .execute();
  
      return input;
    }
}


export const tfrRepo=new TypeormTFRRepo()