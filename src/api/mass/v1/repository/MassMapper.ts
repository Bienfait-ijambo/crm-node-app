
import { IMassDto } from "../domain-model/dto/IMassDto";
import { Mass } from "../../../../entities/Mass";

export class MassMapper{

    public static toDto(mass: Mass) :IMassDto{
        return {
          id: +mass.id,
          name: mass.name,
          status: mass.status
        };
      }


   static fromEntity(masses:Mass[]){
    return masses.map((mass)=>{
      return MassMapper.toDto(mass);
    })
   }
}