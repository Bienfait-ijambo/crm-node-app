import { IProjectRepo } from "../../repository/IProjectRepo"
import { IProjectDto } from "../Dto/IProjectDto"
import { UpdateProjectDto } from "../Dto/UpdateProjectDto"

export class UpdateProjectUseCase  {


  constructor( private repo: IProjectRepo) {
    this.repo = repo
  }

  public async execute(input:IProjectDto){

   const dto=new UpdateProjectDto(input)
    const result = await this.repo.updateProject(dto.getUpdateInput())
    return result
  }


}
