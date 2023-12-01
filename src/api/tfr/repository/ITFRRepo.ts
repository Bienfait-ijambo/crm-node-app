import { PeriodicTfrResult } from "../../../entities/PeriodicTfrResult";
import { TfrResultAccount } from "../../../entities/TfrResultAccount";
import { Tfr } from "../../../entities/Trf";
import { ApiResponse } from "../../common/types/apiResponse";
import { IGetTfrDataInput, createPeriodicResultInput } from "../domain-model/usecases/interfaces/tfr.interfaces";

export interface IGetPeriodTfrResult{
      userId:number
      page: number
}

export interface ITFRRepo{

     createTFr(input: Tfr[]):Promise<Tfr[]>
     createTfrResulatAccount(input: TfrResultAccount):Promise<TfrResultAccount>

      getTfrData(input:IGetTfrDataInput): Promise<Tfr[]>


      createPeriodicTfrResult(input:createPeriodicResultInput): Promise<PeriodicTfrResult>


      getPeriodTfrResult(input:IGetPeriodTfrResult):Promise<ApiResponse<'periodicData',PeriodicTfrResult[]>> 


}