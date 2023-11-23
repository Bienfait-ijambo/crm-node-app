import { TfrResultAccount } from "../../../entities/TfrResultAccount";
import { Tfr } from "../../../entities/Trf";



export interface ITFRRepo{

     createGrossMarginOperation(input: Tfr[]):Promise<Tfr[]>
     createGrossMargin(input: TfrResultAccount):Promise<TfrResultAccount>

}