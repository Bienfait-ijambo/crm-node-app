import { IPartnerRepo } from "../../repository/IPartnerRepo";
import { PartnerDomain } from "../dto/PartnerDomain";
import { ICreatePartnerInput } from "./interfaces/partnerInterfaces";


export class CreatePartnerUseCase  {

  private repo: IPartnerRepo;

  constructor(repo: IPartnerRepo) {
    this.repo = repo
  }

  public async execute(input:ICreatePartnerInput) {

    const partnerDomain= PartnerDomain.createPartnerInput(input)

    const emailExist = await this.repo.findPartnerByEmail(input);

    if (emailExist) throw new Error(`Cette adresse mail existe déjà !`);

    const user = await this.repo.createPartner(partnerDomain);

    // await emailVerificationQueue.addEmailQueue(user.email,user.optNumber);

    return user;
  }
}
