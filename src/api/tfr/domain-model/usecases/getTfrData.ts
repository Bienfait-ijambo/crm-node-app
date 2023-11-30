import { ITFRRepo } from "../../repository/ITFRRepo";
import { CreateGetTFRDataInput } from "../dto/createGetTfrDataInput";
import { IGetTfrDataInput } from "./interfaces/tfr.interfaces";

export class GetTfrDataUseCase {
  constructor(private repo: ITFRRepo) {
    this.repo = repo;
  }

  async execute(input: IGetTfrDataInput) {
 

    const result = await this.repo.getTfrData(input);
    return result;
  }
}


