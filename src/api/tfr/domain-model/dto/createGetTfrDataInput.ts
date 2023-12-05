import { IsNumber, Required } from "../../../../shared/dto-validator-class/src/decorators";
import { ValidateClassProperty } from "../../../../shared/dto-validator-class/src/validators/ValidateClassProperty";
import { IGetTfrDataInput } from "../usecases/interfaces/tfr.interfaces";


export class CreateGetTFRDataInput{
    @IsNumber({
        message:"UserId must be a number"
      })
      userId: number;
  
      @Required({
        message: "veuillez entre la période",
        Length: {
          min: 4,
          max: 30,
        },
      })
      periodCode:string
    
      constructor(input: IGetTfrDataInput) {
        this.userId=input.userId
        this.periodCode=input.periodCode;
  
      }

       getInput() {

        return{
            userId:this.userId,
            periodCode:this.periodCode
        }
      }
    
      validate() {
        const validator= new ValidateClassProperty(this);
        const input=validator.verify(validator.validate())
        return Promise.resolve(input).catch(error=>error)
      
      }
}


