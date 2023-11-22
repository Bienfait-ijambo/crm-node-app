import { isNumber } from "../../../../common/customer-decorators/Number";

import {  IAffectProjectAmountInput } from './../usecases/interfaces/projectInterfaces';

export class CreateAffectProjectAmountInput {

  @isNumber
  protected amount: string;

  @isNumber
  protected userId: number;


  protected status: boolean;

  @isNumber
  protected projectId: number;



  protected paidAmount:number=0

  constructor(input: IAffectProjectAmountInput) {
  
   
    this.amount =input.amount;
    this.userId=input.userId
    this.status=input.status
    this.projectId=input.projectId

    if(!this.isValidAmount()) throw new Error('Montant doit etre superieure à zero')

 
  }


  private isValidAmount(){
    if(parseFloat(this.amount) > 0){
        return true;
    }
    return false;
  }


 


}


