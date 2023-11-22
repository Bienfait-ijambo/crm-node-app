import { IMassDto } from "../domain-model/dto/IMassDto"
import { IUpdateMassInput } from "../domain-model/usecases/interfaces/massInterfaces"
import { Mass } from "../../../../entities/Mass"



export interface IMassRepo{

  //signup
  createMass(input:Mass):Promise<IMassDto>


  getMass():Promise<IMassDto[]>

  getMassByName(name:string):Promise<Boolean>


  updateMass(input:IUpdateMassInput): Promise<IUpdateMassInput>

 
  
}