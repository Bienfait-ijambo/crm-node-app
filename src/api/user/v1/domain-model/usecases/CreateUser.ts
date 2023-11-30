import { CreateUserInput } from "./interfaces/userInterfaces";
import { IUserDto } from "../domain/IUserDto";
import { UserDomain } from "../domain/UserDomain";
import { IUserRepo } from "../../repository/IUserRepo";
import { userRole } from "../domain/Role";
import { CreateOAuthInput } from "../domain/CreateOAuthInput";
import { IGoogleStrategy } from "../auth/interfaces/IGoogleStrategy";
import { ILinkedInStrategy } from "../auth/interfaces/ILinkinStrategy";
import { generateOTP } from "../../../../../shared/util/generateOpt";

export class CreateUserUseCase {
  private repo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.repo = repo;
  }

  public async execute(
    input: CreateUserInput
  ): Promise<Omit<IUserDto, "password">> {
    const userDomain = UserDomain.createUserInput(input);

    const [hash,userEmailExist] = await Promise.all([
      UserDomain.hashPassword(input.password),
      this.repo.findUserByEmail(userDomain.email)
    ])

    userDomain.password = hash;

    if (userEmailExist) throw new Error(`Cette adresse mail existe déjà !`);
    const user = await this.repo.createUser(userDomain);

     
    return user ;
  }

  /**
   * 
   * @param loginData 
   * LinkedIn,Facebook,Google
   */
  async createUserViaPassportStrategies(strategyData: IGoogleStrategy|ILinkedInStrategy){

    const randomIdPlusOAuthProviderId=this.createUserProviderId(strategyData.id)

    const input: CreateUserInput = {
      email: strategyData.email,
      userName: strategyData.displayName,
      password: "",
      role: userRole.OWNER,
      terms: true,
      image:strategyData.photo,
       userProviderId: randomIdPlusOAuthProviderId,
       emailIsVerified:true,

    };

    const userInput = CreateOAuthInput.getInput(input);

    const user = await this.repo.findUserByEmail(userInput.email);

    if (user) {
      await this.repo.updateUserProviderId(user.id,randomIdPlusOAuthProviderId)
      return randomIdPlusOAuthProviderId
      //update
    } else {
      //create user and logged in
       await this.repo.createUser(userInput);
       return randomIdPlusOAuthProviderId
      
    }
  }



  private createUserProviderId(userProviderId: string){
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000);
    const randomCode=generateOTP(6)
    return `${timestamp}-${randomNumber}-${userProviderId}-${randomCode}`;
  }


 


}
