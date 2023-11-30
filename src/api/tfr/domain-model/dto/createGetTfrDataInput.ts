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
          min: 3,
          max: 15,
        },
      })
      period:string
    
      constructor(input: IGetTfrDataInput) {
        this.userId=input.userId
        this.period=input.period;
  
      }

       getInput() {

        return{
            userId:this.userId,
            period:this.period
        }
      }
    
      validate() {
        const validator= new ValidateClassProperty(this);
        const input=validator.verify(validator.validate())
        return Promise.resolve(input).catch(error=>error)
      
      }
}


