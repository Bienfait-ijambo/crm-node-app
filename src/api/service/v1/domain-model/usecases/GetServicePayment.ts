


import { IServiceRepo } from "../../repository/IServiceRepo";
import { IServicePaymentInput } from "./interfaces/serviceInterface";

export class GetServicePaymentUserCase {
  
  constructor(private repo:IServiceRepo){
    this.repo = repo;
  }
  public  async execute(input:IServicePaymentInput) {
  
    const result = await this.repo.getServicePayment(input);
    return result

  }
}

