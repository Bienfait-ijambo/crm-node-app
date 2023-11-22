import { IPartnerDto } from "../domain-model/dto/IPartnerDto"
import { ICreatePartnerInput, IUpdatePartnerInput } from "../domain-model/usecases/interfaces/partnerInterfaces"
import { Partner } from "../../../../entities/Partner"

export interface IPartnerRepo{

  //signup
  createPartner(input:Partner):Promise<IPartnerDto>

  updatePartner(input:IUpdatePartnerInput): Promise<IUpdatePartnerInput>

  findPartnerByEmail(input:ICreatePartnerInput): Promise<Partner> 


  getPartners(name:string,userId:number,page:number):Promise<{ partners: Partner[]; count: number,totalPages:number }>

 
  
}