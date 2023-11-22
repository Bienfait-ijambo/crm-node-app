import { IPartnerDto } from "../domain-model/dto/IPartnerDto";
import { ICreatePartnerInput, IUpdatePartnerInput } from "../domain-model/usecases/interfaces/partnerInterfaces";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { Partner } from "../../../../entities/Partner";
import { catchError } from "../../../../shared/exceptions/CachError";
import { DB } from "../../../common/db/DB";
import { IPartnerRepo } from "./IPartnerRepo";
import { PartnerMapper } from "./PartnerMapper";

export class TypeormPartnerRepo implements IPartnerRepo {
  private db = new DB<Partner>(Partner);

  @catchError
  public async createPartner(partner: Partner):Promise<IPartnerDto> {
    const result = await this.db.save(partner);
    return PartnerMapper.toDto(result);
  }

  @catchError
  public async findPartnerByEmail(input:ICreatePartnerInput): Promise<Partner> {

    const result = await AppDataSource.getRepository(Partner)
    .createQueryBuilder('partner')
    .where(`partner.email = :email`, {email: input.email})
    .andWhere(`partner.userId = :userId`, {userId: input.userId})
    .getOne()
  

    if (result) return result;
  }

  @catchError
  public async getPartners( name: string, userId:number, page: number ): Promise<{ partners: Partner[]; count: number; totalPages: number }> {
    const PAGE_SIZE = 10;

    let partName = name.toLowerCase();

    const [partners, count] = await AppDataSource.getRepository(Partner)
      .createQueryBuilder("partner")
      .where("lower(partner.name) LIKE :partName", { partName: `%${partName}%` })
      .andWhere('partner.userId = :userId', { userId:userId})
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { partners, count, totalPages };
  }

  @catchError
  public async updatePartner(input: IUpdatePartnerInput):Promise<IUpdatePartnerInput> {
    const { id, ...restInput } = input;
    const result = await this.db.update(restInput, id);

    if (!result) throw new Error("partner not found !");

    return input;
  }

  
}

export const partnerRepo= new TypeormPartnerRepo();
