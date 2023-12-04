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

    const tfrData= getTfrResultTypeByCode(input[0].tfrResultType)
    
    // if(typeof tfrData!=='undefined') 
    // throw new Error('Invalid TFR CODE')

    await AppDataSource.transaction(async () => {
 
        // this.repo.createTFr(dto.getValueAddedInput('VALEUR_AJOUTER'))
        // this.repo.createTfrResulatAccount(dto.getTFRValueAddedResult(81 as TfrAccount,'VALEUR_AJOUTER'))
         
        // this.repo.createTFr(dto.getValueAddedInput('RESULTAT_BRUT_D_EXPLOITATION'))
        // this.repo.createTfrResulatAccount(dto.getTFRValueAddedResult(81 as TfrAccount,'RESULTAT_BRUT_D_EXPLOITATION'))

        // this.repo.createTFr(dto.getValueAddedInput('RESULTAT_NET_D_EXPLOITATION'))
        // this.repo.createTfrResulatAccount(dto.getTFRValueAddedResult(81 as TfrAccount,'RESULTAT_NET_D_EXPLOITATION'))

        // this.repo.createTFr(dto.getValueAddedInput('RESULTAT_AVANT_CONTRIBUTION_SUR_BENEFICE'))
        // this.repo.createTfrResulatAccount(dto.getTFRValueAddedResult(81 as TfrAccount,'RESULTAT_AVANT_CONTRIBUTION_SUR_BENEFICE'))
      
        this.repo.createTFr(dto.getValueAddedInput('RESULTAT_NET'))
        // this.repo.createTfrResulatAccount(dto.getTFRValueAddedResult(81 as TfrAccount,'RESULTAT_NET'))
      
    });

  }



}
