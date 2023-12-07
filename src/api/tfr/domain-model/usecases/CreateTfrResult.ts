import { getTfrResultTypeByCode } from "../../../../entities/Trf";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { TfrAccount } from "../../../../shared/types/brandTypes";
import { ITFRRepo } from "../../repository/ITFRRepo";
import { CreateTfrResultDto } from "../dto/createTfrResultDto";
import { ValueAddedInput } from "./interfaces/tfr.interfaces";

/**
 * create tfResult expect the GrossMargin
 */
export class CreateTfrResultUseCase {

  constructor(private repo: ITFRRepo) {
    this.repo = repo;
  }

  async execute(input: ValueAddedInput[]) {
    const dto = new CreateTfrResultDto(input);


    await AppDataSource.transaction(async () => {
 
  
        this.repo.createTFr(dto.getValueAddedInput())
    
    });

  }



}
