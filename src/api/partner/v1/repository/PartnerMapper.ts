
import { Partner } from '../../../../entities/Partner';
import { IPartnerDto } from '../domain-model/dto/IPartnerDto';
export class PartnerMapper {


  public static toDto(partner: Partner) :IPartnerDto{
    return {
      id: +partner.id,
      name:partner.name,
      email: partner.email,
      telephone: partner.telephone,
        userId: partner.userId
    
    };
  }

//   public static fromEntity(userEntity: User[]) {
//     return userEntity.map((user: User) => this.toDto(user));
//   }




}
