import { IMassRepo } from "../../repository/IMassRepo";
import { MassDomain } from "../dto/MassDomain";
import { ICreateMassInput } from "./interfaces/massInterfaces";


export class CreateMassUseCase{

    constructor(private repo:IMassRepo){
        this.repo = repo;
    }

    async execute(input:ICreateMassInput){
        const Mass=MassDomain.createMassInput(input)

        const doesMassExist = await this.repo.getMassByName(input.name)

        if(doesMassExist) throw new Error('Ce masse existe !')
        const result = await this.repo.createMass(Mass)
        return result
    }
}