import { Project, ProjectStatus } from "../../../../../entities/Project";
import { isNumber } from "../../../../common/customer-decorators/Number";
import { Required } from "../../../../common/customer-decorators/Required";

import { IProjectDto } from "./IProjectDto";

export class CreateProjectDto {

  @Required(5, 60)
  protected designation: string;

  @isNumber
  protected amount: string;

  @isNumber
  protected partnerId: number;

  @isNumber
  protected userId: number;

  @isNumber
  protected status: number;

  protected paidAmount:number=0

  constructor(input: IProjectDto) {
  
    this.designation = input.designation
    this.amount ='0'
    this.partnerId = input.partnerId
    this.userId = input.userId
    this.status=input.status
  }
  
 

  public getInsertInput():Project{
    const paidAmount=this.getPaidAmount()
    return new Project(this.designation, this.amount, paidAmount,this.partnerId, this.userId,ProjectStatus.PENDING);

  }


  private getPaidAmount():string{
    return this.paidAmount.toString()
  }

}


