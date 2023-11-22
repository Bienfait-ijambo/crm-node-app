import { Email } from "../../../../../common/domain/Email";
import { Telephone } from "../../../../../common/domain/Telephone";
import { UserPassword } from "../../domain/UserPassword";
import {
  LoginByInputType,
  LoginUserInput,
} from "../../usecases/interfaces/userInterfaces";
import { IsValidLoginInputType } from "./IsValidLoginInputType";

export class VerifyLoginInput {

  private telephone: Telephone;
  private email: Email;
  private password: string;

  @IsValidLoginInputType
  private loginInputType:LoginByInputType

  /**
   *
   * @param loginDto
   */
  constructor(input: LoginUserInput) {

   
    this.loginInputType=input.loginByInputType
  
    if (input.loginByInputType.toUpperCase() === LoginByInputType.EMAIL) {
       
      this.email = new Email(input.email);
      this.password = input.password;
    }

    if (input.loginByInputType.toUpperCase() === LoginByInputType.TELEPHONE) {
      this.telephone = new Telephone(input.telephone);
      this.password = input.password;
    }
  }


  /**
   *
   * @param hashPassword
   */
   async verifyPassword(hashPassword: string): Promise<boolean> {
    const isMatch = await UserPassword.verifyPassword(
      this.password,
      hashPassword
    );
    return isMatch ? true : false;
  }
}
