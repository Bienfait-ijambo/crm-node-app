import { IUserDto } from "../domain-model/domain/IUserDto";
import { EnterPriseInfoInput, IPageActionInput, SearchUserInput, UpdatePasswordInput, UpdateUserInput, UploadImageInput, UploadUserEnterpriseLogoInput, VerifyOTPNumberInput } from "../domain-model/usecases/interfaces/userInterfaces";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { UserNotFound } from "../../../../shared/errors/UserNotFound";
import { User } from "../../../../entities/User";
import { catchError } from "../../../../shared/exceptions/CachError";
import { DB } from "../../../common/db/DB";
import { IUserRepo } from "./IUserRepo";
import { UserMapper } from "./UserMapper";
import { EnterpriseInfo } from "../../../../entities/EnterpriseInfo";
import { logErrorToFile } from "../../../../infrastructure/graphql-server/winston/logger";
import { userRole } from "../domain-model/domain/Role";


export class TypeormUserRepo implements IUserRepo {
 

  private db = new DB<User>(User);



  getUserPermissions(): Promise<any> {
    throw new Error("Method not implemented.");
  }




  @catchError
  public async createUser(user: User): Promise<Omit<IUserDto, "password">> {
    const result = await this.db.save(user);
    return result
  }

  @catchError
  async createEnterpriseInfo(input:EnterPriseInfoInput):Promise<boolean>{

    const infoExist = await this.getUserEnterpiseInfo(input.userId)

  
    if(infoExist.email==''){
      const  saveResult=await this.saveEnterpiseInfo(input)
        return saveResult ? true : false;
    }else{
      const updateResult=await this.updateEnterPriseInfo(input)
      return updateResult ? true : false;
    }
   
  }

  @catchError
  async getUserEnterpiseInfo(userId:number):Promise<EnterpriseInfo>{
    const result = await AppDataSource.getRepository(EnterpriseInfo)
    .createQueryBuilder('enterprise_info')
    .where(`enterprise_info.userId = :userId`, { userId:userId })
    .getOne()
    return result ? result : UserMapper.enterpriseInfoReturnTypeIfNull(userId);
 

  }

  @catchError
  async saveEnterpiseInfo(input:EnterPriseInfoInput){
    const result= await AppDataSource.getRepository(EnterpriseInfo).save(input);
    if(result) return true
  }

  @catchError
  async updateEnterPriseInfo(input:EnterPriseInfoInput){
    const {userId,...restInput}=input
        const update = await AppDataSource.createQueryBuilder()
        .update(EnterpriseInfo)
        .set(restInput)
        .where("userId = :userId", { userId: input.userId })
        .execute();
        return update.affected === 0 ? false : true;
  }


  @catchError
  async findUserByCode(userCode:string):Promise<User> {
    const result = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where(`user.userCode = :userCode`, { userCode: userCode })
    .getOne()
    return result 
  }



  @catchError
  async findUserByIdAndCode(userId:number,userCode:string):Promise<User> {
    const result = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where(`user.id = :id`, { id: userId })
    .andWhere(`user.userCode = :userCode`, { userCode: userCode })
    .getOne()
    return result 
  }


  @catchError
   async findUserByEmail(email: string): Promise<User> {

      const user = await this.db.getOneByColumnName<User>("user", "email", {
        email: email,
      });
     
      if (user) return user;
   
  }

  @catchError
   async findUserByProviderId(userProviderId: string): Promise<User> {
      const user = await this.db.getOneByColumnName<User>("user", "userProviderId", {
        userProviderId: userProviderId,
      });
     
      if (user) return user;
   
  }

  @catchError
   async findUserByTelephone(telephone: string): Promise<User> {
   
    const user = await this.db.getOneByColumnName<User>("user", "telephone", {
      telephone: telephone,
    });
    if (user) return user;
  }


  

  @catchError
  public async findUserById(id: number): Promise<User> {
    const user = await this.db.getOne<number, User>(id, "user");
    if (user == null) throw new UserNotFound();
    return user;
  }

  @catchError
  public async getUser(id: number) {
    const user = await this.findUserById(id);
    return UserMapper.toDto(user);
  }

  @catchError
   async updatePassword( input: UpdatePasswordInput ): Promise<Boolean> {
    const result = await this.db.update( { password: input.newPassword }, input.id );
    return result ?true:false
  }

  @catchError
  async IsValidOptNumber(input: VerifyOTPNumberInput): Promise<boolean> {
    const user = await this.findUserByEmail(input.email);
    if (user == null) throw new Error("Veuillez entre une adresse mail valide !");

    if (user.otpNumber == input.otpNumber) {
      await this.db.update({ emailIsVerified: true }, user.id);
      return true;
    }

    return false;
  }

  @catchError
   async getUsers(input: SearchUserInput,page:number):Promise<{ users: Omit<User,'password'>[]; count: number,totalPages:number }> {


    const PAGE_SIZE = 10;

   const [user,count] = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.userName", "user.email","user.telephone","user.role","user.userCode","user.image",'user.userpermissions',"user.userIsBlocked"])
      .where("lower(user.userName) LIKE :name", { name: `%${input.userName.toLowerCase()}%`})
      .andWhere('user.userCode=:usercode',{usercode:input.userCode})
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

      const totalPages=Math.ceil(count/PAGE_SIZE)

      const users=UserMapper.convertUserPermissionToJson(user)

    return {users,count,totalPages}
  }


  @catchError
  async getSubscriberUserByCode(userCode:string){
    
    const PAGE_SIZE = 10;

   const [users,count] = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.userName", "user.email","user.image","user.userCode","user.userIsBlocked"])
      .where('user.userCode=:usercode',{usercode:userCode})
      .getManyAndCount()

      const totalPages=Math.ceil(count/PAGE_SIZE)
    
    return {users,count,totalPages}
  }

  /**
   * 
   * 
   */
  @catchError
  async getSubscribers():Promise<{ users: Omit<User,'password'>[]; count: number,totalPages:number }> {
    
    /****
     * 
     * TO IMPROVE IN CASE WE HAVE MORE THAN FITH_TEEN USERS
     * 
     */

    const PAGE_SIZE = 15;

    const [users,count] = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .select(["user.id", "user.userName", "user.email","user.telephone","user.role","user.userCode","user.image","user.userIsBlocked"])
    // .where("lower(user.userName) LIKE :name", { name: `%${input.userName.toLowerCase()}%`})
    .where('user.role=:userRole',{userRole:userRole.OWNER})
    // .skip((page - 1) * PAGE_SIZE)
    // .take(PAGE_SIZE)
    .limit(20)
    .getManyAndCount();

    const totalPages=Math.ceil(count/PAGE_SIZE)

     return {users,count,totalPages}

  }

  @catchError
  public async updateUser(input: UpdateUserInput) {
    const {email,...restInput}=input

    const result = await AppDataSource.createQueryBuilder()
    .update(User)
    .set(restInput)
    .where("email = :email", { email: email })
    .execute();
   
     return result.affected === 0? false : true;

  }

  @catchError
  async attribUserPermission(userId:number,input:IPageActionInput[]){
   

    const result = await AppDataSource.createQueryBuilder()
    .update(User)
    .set({userpermissions:input})
    .where("id = :id", { id: userId })
    .execute();

     return result.affected === 0 ? false : true;
    
  }


  @catchError
  async blockUser(userCode:string):Promise<boolean>{
   
    const result = await AppDataSource.createQueryBuilder()
    .update(User)
    .set({userIsBlocked:true})
    .where("userCode = :userCode", { userCode: userCode })
    .execute();

    return result ? true: false;

  }

  @catchError
  async unBlockUser(userCode:string):Promise<boolean>{
   
    const result = await AppDataSource.createQueryBuilder()
    .update(User)
    .set({userIsBlocked:false})
    .where("userCode = :userCode", { userCode: userCode })
    .execute();

    return result ? true: false;

  }


  @catchError
  async updateUserProviderId(userId:number,userProviderId:string){

    const result = await AppDataSource.createQueryBuilder()
    .update(User)
    .set({userProviderId:userProviderId})
    .where("id = :id", { id: userId })
    .execute();

     return result.affected === 0 ? false : true;
    
  }


  

  @catchError
  async uploadImage(input:UploadImageInput):Promise<boolean> {

    const result = await AppDataSource.createQueryBuilder()
    .update(User)
    .set({image: input.image})
    .where("email = :email", { email: input.email })
    .execute();

     return result.affected === 0 ? false : true;
  }


  async deleteUser(userId:number): Promise<Boolean>{
    const result = await AppDataSource.createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: userId })
    .execute();
    return result ? true : false;
  }

  @catchError
  async uploadEnterpriseLogo(input:UploadUserEnterpriseLogoInput):Promise<boolean> {

    const result = await AppDataSource.createQueryBuilder()
    .update(EnterpriseInfo)
    .set({image: input.image})
    .where("userId = :userId", { userId: input.userId })
    .execute();   


    return result ? true : false;
  }
}

export const userRepo = new TypeormUserRepo();
