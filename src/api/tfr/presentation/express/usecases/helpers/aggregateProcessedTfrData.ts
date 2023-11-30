import { Tfr } from "../../../../../../entities/Trf";
import { ProcessNetOperatingIncome } from "./processors/ProcessNetOperatingIncome";
import { ProcessGrossMargin } from "./processors/processGrossMarginData";
import { ProcessGrossOperatingIncome } from "./processors/processGrossOperatingIncome";
import { ProcessNetResult } from "./processors/processNetResult";
import { ProcessProfitBeforeTax } from "./processors/processProfitBeforeTax";
import { ProcessValueAdded } from "./processors/processValueAddedData";



export class AggregateTfrProcessedData{


    constructor(private array:Tfr[]){
        this.array = array;
    }


    execute(){
      const grossMargin=  ProcessGrossMargin.getGrossMargin(this.array)
        const valueAdded=ProcessValueAdded.getValuedAdded(this.array)
        const processGrossOperatingIncome=ProcessGrossOperatingIncome.getData(this.array)
       const netOperatingIncome= ProcessNetOperatingIncome.getData(this.array)
       const profitBeforeTax=ProcessProfitBeforeTax.getData(this.array)
       const netResult=ProcessNetResult.getData(this.array)
        
      return[
        ...grossMargin,
        ...valueAdded,
        ...processGrossOperatingIncome,
        ...netOperatingIncome,
        ...profitBeforeTax,
        ...netResult
      ]
    }
}