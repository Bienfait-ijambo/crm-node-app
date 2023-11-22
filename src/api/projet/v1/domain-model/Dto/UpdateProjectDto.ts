
import { isNumber } from "../../../../common/customer-decorators/Number";
import { CreateProjectDto } from "./CreateProjectDto";
import { IProjectDto } from "./IProjectDto";

export class UpdateProjectDto extends CreateProjectDto{

    @isNumber
    protected id:number

    constructor(input: IProjectDto){
        super(input)
        this.id = input.id
    }
      public getUpdateInput(){
        
        return{
            id: this.id,
            designation:this.designation,
            amount:this.amount,
            partnerId:this.partnerId,
            status:this.status
        }
      }
}