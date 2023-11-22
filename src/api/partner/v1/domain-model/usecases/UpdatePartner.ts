import { IPartnerRepo } from "../../repository/IPartnerRepo"
import { PartnerDomain } from "../dto/PartnerDomain"
import { IUpdatePartnerInput } from "./interfaces/partnerInterfaces"

export class UpdatePartnerUseCase  {


  constructor( private repo: IPartnerRepo) {
    this.repo = repo
  }

  public async execute(input:IUpdatePartnerInput){

    const updateInput=PartnerDomain.updatePartnerInput(input)
    const result = await this.repo.updatePartner(updateInput)
    return result
  }


}
