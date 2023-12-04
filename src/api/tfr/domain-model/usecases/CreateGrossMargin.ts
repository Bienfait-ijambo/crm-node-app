import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { ITFRRepo } from "../../repository/ITFRRepo";
import { CreateGrossMarginDto } from "../dto/createGrossMarginDto";
import { GrossMarginInput } from "./interfaces/tfr.interfaces";

export class CreateGrossMarginUseCase {
  constructor(private repo: ITFRRepo) {
    this.repo = repo;
  }
  async execute(input: GrossMarginInput) {
    const dto = new CreateGrossMarginDto(input);

    const result = await AppDataSource.transaction(async () => {
        
      const [result1]=await Promise.all([
        this.repo.createTFr(dto.getGrossMarginInput()),
        // this.repo.createTfrResulatAccount(dto.getTfrResultAccountInput()),
      ]);

      return result1;
    });

    return result;
  }
}
