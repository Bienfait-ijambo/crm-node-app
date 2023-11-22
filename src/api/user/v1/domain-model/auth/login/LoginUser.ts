import {
  LoginByInputType,
  LoginUserInput,
} from "../../usecases/interfaces/userInterfaces";
import { successLoginResponse } from "../common/responses/SuccessLoginResponse";
import { UserEmailNotVerified } from "../common/responses/UserEmailNotVerified";
import { VerifyLoginInput } from "../validation/VerifyLoginInput";
import { JwtToken } from "../../../../../../middleware/Jwt";
import { IUserRepo } from "../../../repository/IUserRepo";
import { OWNER_USER, User } from "../../../../../../entities/User";
import { sendEmailVerification } from "../../events/EmailVerification";
import { catchError } from "../../../../../../shared/exceptions/CachError";
import { userRepo } from "../../../repository/TypeormUserRepo";
import { GetUserEnterpriseInfoUseCase } from "../../usecases/GetUserEnterpiseInfo";
import { CreateLoginError } from "../common/errors/CreateLoginError";
import { ILoginResponse } from "../interfaces/ILoginResponse";
import { logErrorToFile } from "../../../../../../infrastructure/graphql-server/winston/logger";
import { CreateUserBlockedError } from "../common/errors/CreateUserBlockedError";

export class LoginUserUseCase {
  constructor(private repo: IUserRepo) {
    this.repo = repo;
  }

  async execute(input: LoginUserInput) {
    const loginInput = new VerifyLoginInput(input);

    let user: User = await this.repo.findUserByEmail(input.email);

    if (!user) throw new CreateLoginError();

    if(user.userIsBlocked) throw new CreateUserBlockedError()

    const isValidPwd = await loginInput.verifyPassword(user.password);

    if (!isValidPwd) throw new CreateLoginError();


    const emailIsValid=await this.isUserMailValid(user)

    if(emailIsValid)  return UserEmailNotVerified();

    const loginData = await this.getReturnedUserLogInData(user);

    return loginData;
  }



  private async isUserMailValid(user:User):Promise<boolean>{
    if (!user.emailIsVerified) {
      await sendEmailVerification(user.email, user.otpNumber).catch((error)=>logErrorToFile(error,'Mail-error'));
     return true
    }else{
      return false;
    }
  }
  /**
   * 
   * Login user via Google, Facebook,LinkedIn
   */
  async loginUserViaOAuth(userProviderId: string) {
    const loginUseCase = new LoginUserUseCase(userRepo);

    const userEmailExist = await this.repo.findUserByProviderId(userProviderId);

    
    if(userEmailExist.userIsBlocked) throw new CreateUserBlockedError()

    if (userEmailExist) {
      //return token
      const loginData = await loginUseCase.getReturnedUserLogInData( userEmailExist );
      return loginData;
    } else {
      throw new Error("Invalid user !");
    }
  }

  private async getReturnedUserLogInData(user: User): Promise<ILoginResponse> {
    this.userIsOwnByMainUser(user);

    const { accessToken, refreshToken } = await this.getUserTokens(user);

    const enterpriseInfo = await this.getUserEnterpiseInfo(user);

    const response = successLoginResponse();

     const permissions = user.userpermissions as any

    return {
      response: response,
      user: user,
      permissions: Array.isArray(permissions) ? permissions : null,
      enterpriseInfo: enterpriseInfo,
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }

  /**
   *
   * @param user
   * @returns accessToken and refreshToken
   */

  private async getUserTokens(user: User) {
  const userId=user.id.toString()

    const [ accessToken,refreshToken]=await Promise.all([
       JwtToken.signAccessToken(userId),
      JwtToken.signRefreshToken(userId)
    ])
    
    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   *
   * @param user
   * check if the user was created by a user with role owner
   * if true the created user will use the ownId to access its data
   */
  private userIsOwnByMainUser(user: User): void {
    user.ownByUserId > OWNER_USER.id ? (user.id = user.ownByUserId) : "";
  }

  private async getUserEnterpiseInfo(user: User) {
    const userId =
      user.ownByUserId === OWNER_USER.id ? user.id : user.ownByUserId;
    const useCase = new GetUserEnterpriseInfoUseCase(userRepo);
    const result = await useCase.execute(userId);
    return result;
  }

  
}
