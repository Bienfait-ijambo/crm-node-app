
import { isNumber } from './../../../../common/customer-decorators/Number';
import { CreateServiceDto } from './CreateServiceDto';
import { IServiceDto } from './IServiceDto';

export class UpdateServiceDto extends CreateServiceDto{

    @isNumber
    private id:number

    constructor(input:IServiceDto) {
        super(input);
        this.id = input.id;
    }

    public getUpdateInput(){
        return{
            id:this.id,
            name:this.name
        }
    }

}
