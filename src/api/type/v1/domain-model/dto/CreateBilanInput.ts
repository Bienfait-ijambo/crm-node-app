import { isNumber } from "../../../../common/customer-decorators/Number";
import { Required } from "../../../../common/customer-decorators/Required";
import { IBilanInput } from "../usecases/interfaces/typeInterfaces";



export class CreateBilanInput{

    @isNumber
    private  page:number 

    @isNumber
    private userId:number 

    @Required(10,10)
    private startDate:string

    @Required(10,10)
    private endDate:string


    constructor(input:IBilanInput){
        this.page = input.page
        this.userId = input.userId
        this.startDate = input.startDate
        this.endDate = input.endDate
    }


    public getInput(){
        return{
            page:this.page,
            userId:this.userId,
            startDate:this.startDate,
            endDate:this.endDate
        }
    }

 
}