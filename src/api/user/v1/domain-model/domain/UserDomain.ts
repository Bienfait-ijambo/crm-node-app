
import {  OWNER_USER, User } from "../../../../../entities/User";
import { generateRandomNumber } from "../../../../../shared/util/generateOpt";
import { Email } from "../../../../common/domain/Email";
import { Telephone } from "../../../../common/domain/Telephone";
import { CreateUserInput, UpdateUserInput, UploadImageInput, } from "../usecases/interfaces/userInterfaces";
import { Role, userRole } from "./Role";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";
import { generateUserCode } from "./generateUserCode";

export class UserDomain {

  public static async hashPassword(password: string) {
    const hashPassword = await UserPassword.hashPassword(password);
    return hashPassword;
  }

  public static createUserInput(input: CreateUserInput) {
  
    const email = new Email(input.email);
    const userCode = generateUserCode(email.getEmail());
    const otp=generateRandomNumber(6)
    const userProviderId=''
    const emailIsVerified=true
   
    return new User('-',email.getEmail(), userRole.OWNER,'',input.password,userCode,otp,emailIsVerified,input.terms,OWNER_USER.id,userProviderId);
   
  }

  

  public static uploadUserImageInput(input: UploadImageInput) {
    const email=new Email(input.email)
   return {
    email: email.getEmail(),
    image: input.image,
   }
  }

  public static updateUserInput(input: UpdateUserInput) {
  

    const userName=new UserName(input.userName)
    const telephone=new Telephone(input.telephone)
    const email=new Email(input.email)


    return {
      userName: userName.getUserName(),
      telephone:telephone.getTelephone(),
      email:email.getEmail()
    };
  }
}
