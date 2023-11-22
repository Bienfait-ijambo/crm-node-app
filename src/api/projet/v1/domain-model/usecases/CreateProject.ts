import { IProjectRepo } from "../../repository/IProjectRepo";
import { CreateProjectDto } from "../Dto/CreateProjectDto";
import { IProjectDto } from "../Dto/IProjectDto";

export class CreateProjectUseCase  {

 

  constructor( private repo: IProjectRepo) {
    this.repo = repo
  }

  public async execute(input:IProjectDto) {

    const dto=new CreateProjectDto(input)

    const result = await this.repo.createProject(dto.getInsertInput());

    return result;
  }
}
