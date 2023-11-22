
import { IServiceRepo } from "../../repository/IServiceRepo";
import { UpdateServiceDto } from "../dto/UpdateServiceDto";
import { IServiceDto } from './../dto/IServiceDto';

export class UpdateServeUseCase  {

  private repo: IServiceRepo;

  constructor(repo: IServiceRepo) {
    this.repo = repo
  }

  public async execute(input:IServiceDto) {

    const service= new UpdateServiceDto(input)

    const result = await this.repo.updateService(service.getUpdateInput());

    return result;
  }
}
