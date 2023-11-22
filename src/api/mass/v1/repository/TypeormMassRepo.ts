
import { IMassDto } from "../domain-model/dto/IMassDto";
import { IUpdateMassInput } from "../domain-model/usecases/interfaces/massInterfaces";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { Mass } from "../../../../entities/Mass";
import { catchError } from "../../../../shared/exceptions/CachError";
import { DB } from "../../../common/db/DB";
import { IMassRepo } from "./IMassRepo";
import { MassMapper } from "./MassMapper";


export class TypeormMassRepo implements IMassRepo{
    
    private db = new DB<Mass>(Mass);

    @catchError
    async createMass(input: Mass): Promise<IMassDto> {
        const result = await this.db.save(input);
       return MassMapper.toDto(result);
    }


    @catchError
   async getMass(): Promise<IMassDto[]> {
        const masses = await AppDataSource
        .getRepository(Mass)
        .createQueryBuilder("mass")
        .orderBy('id','DESC')
        .getMany()
        return MassMapper.fromEntity(masses)

    }
    @catchError
    async getMassByName(name: string): Promise<Boolean> {
         const mass = await this.db.getOneByColumnName<Mass>("mass", "name", {
            name: name,
          });

         return  mass ==null ? false:true
    }


    @catchError
    async updateMass(input: IUpdateMassInput): Promise<IUpdateMassInput> {

        const {id,...restInput}=input
        const result = await this.db.update(restInput,id );
        if (!result) throw new Error("Ce Mass n'existe pas !");
      
        return input;
    }

    


}

export const MassRepo=new TypeormMassRepo()