import { IProjectDto } from "../domain-model/Dto/IProjectDto";
import { Project } from "../../../../entities/Project";

export class ProjectMapper {
  public static toDto(Project: Project): IProjectDto {
    return {
      id: +Project.id,
      designation: Project.designation,
      amount: Project.amount,
      partnerId: Project.partnerId,
      userId: Project.userId,
      status: Project.status,
    };
  }
}
