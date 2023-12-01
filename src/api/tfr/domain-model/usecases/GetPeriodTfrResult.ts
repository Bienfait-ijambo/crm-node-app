import { IGetPeriodTfrResult, ITFRRepo } from "../../repository/ITFRRepo";


export class GetPeriodTfrResultUseCase {
  constructor(private repo: ITFRRepo) {
    this.repo = repo;
  }

  async execute(input:IGetPeriodTfrResult) {

    const result = await this.repo.getPeriodTfrResult(input);
    return result;
  }
}


