
import { ValidationError } from "../../../../../shared/errors/validationError";
import { ITypeRepo } from "../../repository/ITypeRepo";
import { IBilanInput, ICreateAccountResultInput } from "./interfaces/typeInterfaces";



export class CreateAccountResultUseCase{

    constructor(private repo:ITypeRepo){
        this.repo = repo;
    }

    async execute(input:ICreateAccountResultInput){
        if(input.startDate=='' || input.endDate=='') 
        throw new  ValidationError('Veuiller entrer la date debut et Fin')
        const result = await this.repo.getResultAccount(input)
        return result
    }
}