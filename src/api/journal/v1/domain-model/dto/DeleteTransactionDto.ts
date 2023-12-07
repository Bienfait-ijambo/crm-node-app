import { IsNumber, Required } from "../../../../../shared/dto-validator-class/src/decorators";
import { ValidateClassProperty } from "../../../../../shared/dto-validator-class/src/validators/ValidateClassProperty";

export interface IDeleteTransaction{
    userId:number
    transactionCode:string
}
export class DeleteTransactionDto{
    @IsNumber({
        message:"UserId must be a number"
      })
      userId: number;
  
      @Required({
        message: "veuillez entre le code",
    
      })
      transactionCode:string
    
      constructor(input: IDeleteTransaction) {
        this.userId=input.userId
        this.transactionCode=input.transactionCode;
  
      }

       getInput() {

        return{
            userId:this.userId,
            transactionCode:this.transactionCode
        }
      }
    
      validate() {
        const validator= new ValidateClassProperty(this);
        const input=validator.verify(validator.validate())
        return Promise.resolve(input).catch(error=>error)
      
      }
}


