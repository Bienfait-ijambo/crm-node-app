import { User } from "../../../../../entities/User";
import { generateOTP } from "../../../../../shared/util/generateOpt";
import { Email } from "../../../../common/domain/Email";
import { ID } from "../../../../common/domain/ID";
import { IUserOwnByMainUser } from "../usecases/interfaces/userInterfaces";
import { Role } from "./Role";
import { generateUserCode } from "./generateUserCode";

export class CreateUserOwnByMainUser {
  public static createUserInput(input: IUserOwnByMainUser) {
    // const buildEmail=CreateUserOwnByMainUser.buildUserEmail(input)
    const email = new Email(input.email);
    const role = new Role(input.role);
    const userCode = generateUserCode(email.getEmail());
    const ownByUserId = new ID(input.ownByUserId);
    const emailIsVerified = false;

    return new User(
      "-",
      email.getEmail(),
      role.getRole(),
      "",
      input.password,
      input.userCode,
      userCode,
      emailIsVerified,
      input.terms,
      ownByUserId.getId(),
      ""
    );
  }

  /**
   *
   * 
   */
  
}
