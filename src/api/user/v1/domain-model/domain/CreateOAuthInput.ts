import {
  OWNER_USER,
  User,
} from "../../../../../entities/User";
import { CreateUserInput } from "../usecases/interfaces/userInterfaces";
import { userRole } from "./Role";
import { generateUserCode } from "./generateUserCode";

export class CreateOAuthInput {


  public static getInput(input: CreateUserInput) {
 

    const userCode = generateUserCode(input.email);
 

    const otp = "";

    return new User(
      input.userName,
      input.email,
      userRole.OWNER,
      input.image,
      input.password,
      userCode,
      otp,
      input.emailIsVerified,
      input.terms,
      OWNER_USER.id,
      input.userProviderId
    );
  }


  protected static generateUserCode(){
    const timestamp = Date.now();
  }
}
