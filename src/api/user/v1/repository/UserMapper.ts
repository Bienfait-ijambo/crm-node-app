
import { IUserDto } from "../domain-model/domain/IUserDto";
import { User } from "../../../../entities/User";
import { IPageActionInput } from "../domain-model/usecases/interfaces/userInterfaces";
import { EnterpriseInfo } from "../../../../entities/EnterpriseInfo";

export class UserMapper {


  public static toDto(user: User) :Omit<IUserDto,'password'>{
    return {
      id: +user.id,
      userName:user.userName,
      email: user.email,
      image: user?.image,
      telephone:user.telephone,
      isValidPhoneNumber:user.isValidPhoneNumber,
      role: user.role,
      userCode: user.userCode,
      otpNumber:user.otpNumber
    };
  }

  public static fromEntity(userEntity: User[]) {
    return userEntity.map((user: User) => this.toDto(user));
  }



  public static userPermissionInput(input:IPageActionInput[]):Omit<IPageActionInput,'userCode'>[] {
    const newArr=[]

    for(let i=0;i<input.length;i++){
      newArr.push({
        id: input[i].id,
        pageName: input[i].pageName,
        actions:input[i].actions
      })
    }
    return newArr
  }


  /**
   * 
   * @param userId 
   * @returns empty enterprise info for a user 
   */
  static enterpriseInfoReturnTypeIfNull(userId:number):EnterpriseInfo{
    return new EnterpriseInfo(userId,'','','','','','')

  }

  static convertUserPermissionToJson(userArray:any[]){
      const users=userArray.map(user =>{
        const {userpermissions,...restOb}=user

        return {
          ...restOb,
          userpermissions: Array.isArray(userpermissions) ? userpermissions:[]
        }
      })
      return users
  }



  


}
