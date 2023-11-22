
import {  IUserOwnByMainUser } from "./interfaces/userInterfaces";
import { IUserDto } from '../domain/IUserDto';
import { UserDomain } from "../domain/UserDomain";
import { IUserRepo } from "../../repository/IUserRepo";
import { sendEmailVerification } from "../events/EmailVerification";
import { CreateUserOwnByMainUser } from "../domain/CreateUserOwnByMainUser";
import { catchError } from "../../../../../shared/exceptions/CachError";
import { logErrorToFile } from "../../../../../infrastructure/graphql-server/winston/logger";



export class CreateUserOwnByMainUserUseCase  {

  private repo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.repo = repo
  }

 
   async execute(input:IUserOwnByMainUser): Promise<Omit<IUserDto, "password">> {

    const dto= CreateUserOwnByMainUser.createUserInput(input)

    const hash= await UserDomain.hashPassword(input.password)
    dto.password = hash

    const emailExist = await this.repo.findUserByEmail(dto.email);

    if (emailExist) throw new Error(`Cette adresse mail existe déjà !`);

    const user = await this.repo.createUser(dto);


     sendEmailVerification(user.email,user.otpNumber).catch(async(error)=>{
        logErrorToFile(error,'Mail-error')
    });

    return user;
  }
}
