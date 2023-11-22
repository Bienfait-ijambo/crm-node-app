import { IMassRepo } from "../../repository/IMassRepo";
import { MassDomain } from "../dto/MassDomain";
import {  IUpdateMassInput } from "./interfaces/massInterfaces";


export class UpdateMassUseCase{

    constructor(private repo:IMassRepo){
        this.repo = repo;
    }

    async execute(input:IUpdateMassInput){
        MassDomain.updateMassInput(input)
       const result=await this.repo.updateMass(input)
        return result
    }
}