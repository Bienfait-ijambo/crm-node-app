import { getTfrResultTypeByCode } from "../../../../entities/Trf";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
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

    const tfrData= getTfrResultTypeByCode(input[0].tfrResultType)
    
    // if(typeof tfrData!=='undefined') 
    // throw new Error('Invalid TFR CODE')

    await AppDataSource.transaction(async () => {
 
        this.repo.createTFr(dto.getValueAddedInput(tfrData.name))
        this.repo.createTfrResulatAccount(dto.getTFRValueAddedResult(tfrData.code,tfrData.name))
      
    });

  }



}
