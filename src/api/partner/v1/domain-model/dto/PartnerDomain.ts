import { Partner } from "../../../../../entities/Partner";
import { Email } from "../../../../common/domain/Email";
import { ID } from "../../../../common/domain/ID";
import { Name } from "../../../../common/domain/Name";
import { Telephone } from "../../../../common/domain/Telephone";
import { ICreatePartnerInput, IUpdatePartnerInput } from "../usecases/interfaces/partnerInterfaces";


export class PartnerDomain {

 
  public static createPartnerInput(input: ICreatePartnerInput) {


    const {name,email,telephone}=this.validateInput(input)
    const userId = new ID(input.userId);
   
 
    return new Partner(name,email,telephone,userId.getId());
   
  }


  private static validateInput(input: ICreatePartnerInput|IUpdatePartnerInput){
    const email = new Email(input.email);
    const name=new Name(input.name)
    const telephone=new Telephone(input.telephone)
    

    return{name:name.getName(),email:email.getEmail(),telephone:telephone.getTelephone()}
  }
  


  public static updatePartnerInput(input: IUpdatePartnerInput) {
  
    const id = new ID(input.id);

    const {name,email,telephone}=this.validateInput(input)

    return {
      id: id.getId(),
      email: email,
      name: name,
      telephone:telephone
    };
  }
}
