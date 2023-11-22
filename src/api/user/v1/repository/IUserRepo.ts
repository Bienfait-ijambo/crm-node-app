import { IUserDto } from "../domain-model/domain/IUserDto"
import {  IPageActionInput, SearchUserInput, UpdatePasswordInput, UpdateUserInput, UploadImageInput, UploadUserEnterpriseLogoInput, VerifyOTPNumberInput } from "../domain-model/usecases/interfaces/userInterfaces"
import { User } from "../../../../entities/User"
import { EnterpriseInfo } from "../../../../entities/EnterpriseInfo"


export interface IUserRepo{

  //signup
  createUser(input:User):Promise<Omit<IUserDto,'password'>>

  updatePassword(input:UpdatePasswordInput): Promise<Boolean>

  findUserByEmail(email:string): Promise<User> 

  findUserByTelephone(Telephone:string): Promise<User> 

  findUserById(id: number): Promise<User>

  getUsers(input:SearchUserInput,page:number):Promise<{ users: Omit<User,'password'>[]; count: number,totalPages:number }>

  getUser(id:number)

  updateUser(input:UpdateUserInput): Promise<boolean>

  IsValidOptNumber(input:VerifyOTPNumberInput):Promise<boolean>

  uploadImage(input:UploadImageInput):Promise<boolean>


  getUserPermissions(): Promise<any>


  attribUserPermission(userId:number,input:IPageActionInput[])


  createEnterpriseInfo(input:EnterpriseInfo):Promise<boolean>

  getUserEnterpiseInfo(userId:number):Promise<EnterpriseInfo>

  uploadEnterpriseLogo(input:UploadUserEnterpriseLogoInput):Promise<boolean> 

  findUserByProviderId(userProviderId: string): Promise<User>

  findUserByCode(userCode: string): Promise<User>


  updateUserProviderId(userId:number,userProviderId:string): Promise<Boolean>

  deleteUser(userId:number): Promise<Boolean>


  findUserByIdAndCode(userId:number,userCode:string):Promise<User>

  getSubscribers():Promise<{ users: Omit<User,'password'>[]; count: number,totalPages:number }> 


  getSubscriberUserByCode(userCode:string)

  blockUser(userCode: string): Promise<boolean>

  unBlockUser(userCode:string):Promise<boolean>
  
  
  
}