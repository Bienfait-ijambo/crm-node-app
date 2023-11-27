import { TfrResultAccount } from "../../../entities/TfrResultAccount";
import { Tfr } from "../../../entities/Trf";



export interface ITFRRepo{

     createTFr(input: Tfr[]):Promise<Tfr[]>
     createTfrResulatAccount(input: TfrResultAccount):Promise<TfrResultAccount>

}