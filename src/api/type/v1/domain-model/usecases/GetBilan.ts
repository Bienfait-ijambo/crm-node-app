
import { ValidationError } from "../../../../../shared/errors/validationError";
import { ITypeRepo } from "../../repository/ITypeRepo";
import { IBilanInput } from "./interfaces/typeInterfaces";



export class GetBilanUseCase{

    constructor(private repo:ITypeRepo){
        this.repo = repo;
    }

    async execute(input:IBilanInput){
        if(input.startDate=='' || input.endDate=='') 
        throw new  ValidationError('Veuiller entrer la date debut et Fin')
        const result = await this.repo.getBilan(input)
        return result
    }
}