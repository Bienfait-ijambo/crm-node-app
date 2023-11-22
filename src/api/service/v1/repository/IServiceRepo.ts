import { Service } from "../../../../entities/Service";
import { ServicePayment } from "../../../../entities/ServicePayment";
import { ApiResponse } from "../../../common/types/apiResponse";
import { IServicePaymentDto } from "../domain-model/dto/CreateServicePaymentDto";
import { IServicePaymentInput, IUpdateServiceInput } from "../domain-model/usecases/interfaces/serviceInterface";

export interface IServiceRepo{

  //signup
  createService(input:Service):Promise<Service>

  updateService(input:IUpdateServiceInput): Promise<IUpdateServiceInput>


  getServices(name:string,userId:number,page:number):Promise<ApiResponse<'services',Service[]>>

  createServicePayment(input:IServicePaymentDto):Promise<void>
 
  getServicePayment(input:IServicePaymentInput):Promise<ApiResponse<'services',Service[]>>
}