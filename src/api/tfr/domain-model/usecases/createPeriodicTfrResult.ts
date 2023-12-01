import { ITFRRepo } from "../../repository/ITFRRepo";
import { CreateTfrPeriodResultDto } from "../dto/createTfrPeriodResultDto";
import { createPeriodicResultInput } from "./interfaces/tfr.interfaces";

export class CreatePeriodicTfrResult {
  constructor(private repo: ITFRRepo) {
    this.repo = repo;
  }

  async execute(input: createPeriodicResultInput) {
    try {
      const dto = new CreateTfrPeriodResultDto(input);
      await dto.validate();
      const result = await this.repo.createPeriodicTfrResult(dto.getInput());
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
