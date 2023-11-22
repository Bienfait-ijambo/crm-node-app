import { ITypeDto } from "../domain-model/dto/ITypeDto";
import { AccountType } from "../../../../entities/AccountType";


export class TypeMapper{

    public static toDto(Type: AccountType) :Omit<ITypeDto,'massId'>{
        return {
          id: +Type.id,
          name: Type.name,

    
        };
      }
}