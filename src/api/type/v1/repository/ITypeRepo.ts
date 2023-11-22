import { ITypeDto } from "../domain-model/dto/ITypeDto";
import { IBilanInput, IUpdateTypeInput } from "../domain-model/usecases/interfaces/typeInterfaces";
import { AccountType } from "../../../../entities/AccountType";


export interface ITypeRepo{

  //signup
  createType(input:AccountType):Promise<Omit<ITypeDto,'massId'>>


  getAccountTypesWithMasses()

  updateType(input:IUpdateTypeInput): Promise<IUpdateTypeInput>

  getTypeByNameAndMassId(name: string,massId:number): Promise<Boolean> 

  createAccounTypeMass(typeId:number,massId:number)

  updateAccounTypeMass(typeId:number,massId:number)

  getTypeByName(name: string)

  accountTypeHasMass(accountTypeId:number,massId:number)

  getBilan( input: IBilanInput ) 

  getResultAccount(input: IBilanInput) 


  
}