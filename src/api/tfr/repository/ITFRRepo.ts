import { TfrResultAccount } from "../../../entities/TfrResultAccount";
import { Tfr } from "../../../entities/Trf";
import { IGetTfrDataInput } from "../domain-model/usecases/interfaces/tfr.interfaces";



export interface ITFRRepo{

     createTFr(input: Tfr[]):Promise<Tfr[]>
     createTfrResulatAccount(input: TfrResultAccount):Promise<TfrResultAccount>

      getTfrData(input:IGetTfrDataInput): Promise<Tfr[]>

}