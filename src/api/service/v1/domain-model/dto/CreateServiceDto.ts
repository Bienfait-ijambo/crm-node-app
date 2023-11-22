import { Service } from "../../../../../entities/Service";
import { isNumber } from "../../../../common/customer-decorators/Number";
import { Required } from "../../../../common/customer-decorators/Required";
import { IServiceDto } from "./IServiceDto";

export class CreateServiceDto{

    @Required(4,40)
    protected name: string;

    @isNumber
    protected userId:number

    constructor(input:IServiceDto){
        this.name = input.name;
        this.userId = input.userId;
    }


    public getInsertInput(){
        return new Service(this.name, this.userId)
    }
    
}