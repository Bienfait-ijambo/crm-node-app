import { EnterpriseInfo } from "../../../../../entities/EnterpriseInfo";
import { isNumber } from "../../../../common/customer-decorators/Number";
import { Required } from "../../../../common/customer-decorators/Required";
import { EnterPriseInfoInput } from "../usecases/interfaces/userInterfaces";



export class CreateEnterpiseDto{

    @isNumber
    private userId: number;

    @Required(3,50)
    private name: string;
  
  
    @Required(5,50)
    private email: string;
   
    @Required(9,15)
    private telephone: string;

    @Required(3,50)
    private taxNumberId: string;

    @Required(3,50)
    private rccm: string;
  

    @Required(3,50)
    private idNat: string;

    constructor(private input:EnterPriseInfoInput){
        this.input = input
    }

   
    public getInput(){

        return new EnterpriseInfo(this.input.userId,this.input.name,this.input.email,this.input.telephone,this.input.taxNumberId,this.input.rccm,this.input.idNat)
    }
}