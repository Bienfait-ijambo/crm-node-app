
import { IServiceRepo } from "../../repository/IServiceRepo";
import { CreateServiceDto } from "../dto/CreateServiceDto";
import { IServiceDto } from './../dto/IServiceDto';

export class CreateServiceUseCase  {

  private repo: IServiceRepo;

  constructor(repo: IServiceRepo) {
    this.repo = repo
  }

  public async execute(input:IServiceDto) {

    const service= new CreateServiceDto(input)

    const result = await this.repo.createService(service.getInsertInput());


    return result;
  }
}
