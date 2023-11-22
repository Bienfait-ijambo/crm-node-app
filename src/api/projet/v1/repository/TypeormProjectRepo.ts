import { IProjectDto } from "../domain-model/Dto/IProjectDto";
import { IGetProjectIdAndNameInput, IUpdateProjectInput } from "../domain-model/usecases/interfaces/projectInterfaces";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { Project, ProjectStatus } from "../../../../entities/Project";
import { catchError } from "../../../../shared/exceptions/CachError";
import { DB } from "../../../common/db/DB";
import { IProjectRepo } from "./IProjectRepo";
import { ProjectMapper } from "./ProjectMapper";
import { ProjectPayment } from "../../../../entities/ProjectPayment";
import { IGetTotalPaidInput, IcreateProjectPayementInput } from "../domain-model/usecases/interfaces/projectPaymentInterfaces";


export class TypeormProjectRepo implements IProjectRepo {
  private db = new DB<Project>(Project);

  @catchError
  public async createProject(Project: Project):Promise<IProjectDto> {
    const result = await this.db.save(Project);
    return ProjectMapper.toDto(result);
  }

  @catchError
  async getProjetNameAndId(input:IGetProjectIdAndNameInput){

    const [projects]= await AppDataSource.getRepository(Project)
    .createQueryBuilder("project")
    .select(["project.id","project.designation"])
    .where("lower(project.designation) LIKE :designation", { designation: `%${input.designation}%` })
    .andWhere('project.userId = :userId', { userId:input.userId})
    // .andWhere('project.status = :status', { status:ProjectStatus.PENDING})
    .take(10)
    .getManyAndCount();

    return{projects}
  }


  @catchError
  async getProjectAmount(projectId:number,userId:number){

    const result = await AppDataSource.getRepository(Project)
    .createQueryBuilder("project")
    .select(["project.amount","project.paidAmount"])
    .where("project.id = :id", { id: projectId })
    .andWhere("project.userId = :userId", { userId: userId })
    .orderBy('project.id','DESC')
    .getOne()
    return  result

  }

  @catchError
 async getTotalProjectPaidAmount(input:IGetTotalPaidInput): Promise<ProjectPayment>{

  const result = await AppDataSource.getRepository(ProjectPayment)
  .createQueryBuilder("project_payment")
  .select("SUM(CAST(project_payment.amount AS FLOAT))", "totalPaidAmount")
  .where("project_payment.projectId = :projectId", { projectId: input.projectId })
  .andWhere("project_payment.userId = :userId", { userId: input.userId })
  .getOne()
  return  result

 }


  @catchError
  async createProjectPayment(input: IcreateProjectPayementInput):Promise<ProjectPayment>{

    const data=new ProjectPayment(input.projectId, input.amount,input.userId)
  
    const result = AppDataSource.getRepository(ProjectPayment).save(data)
 
      return result
  }

 
  @catchError
  public async getProjects( name: string, userId:number, page: number ): Promise<{ projects: Project[]; count: number; totalPages: number }> {
    const PAGE_SIZE = 10;

    let projectName = name.toLowerCase();

    const [projects, count] = await AppDataSource.getRepository(Project)
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.partner",'partner')
      .leftJoinAndSelect("project.projectPayment",'projectPayment')
      .where("lower(project.designation) LIKE :designation", { designation: `%${projectName}%` })
      .andWhere('project.userId = :userId', { userId:userId})
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);
 


    return { projects, count, totalPages };
  }

  @catchError
  public async updateProject(input: IUpdateProjectInput):Promise<IUpdateProjectInput> {
    const { id, amount,...restInput } = input;
    const result = await this.db.update(restInput, id);

    if (!result) throw new Error("Project not found !");

    return input;
  }

  @catchError
  async affectAmountToProject(amount:number,projectId:number){
   const result = await this.db.update({amount:amount}, projectId);
   return result ? true :false
 
  }

  @catchError
 async updatePaidAmountField(paidAmount:number,projectId:number){
  await this.db.update({paidAmount:paidAmount}, projectId);

 }

 @catchError
 async changeProjectStatus(projectId:number){
  await this.db.update({status:ProjectStatus.FINISHED}, projectId);
 }

  
}

export const ProjectRepo= new TypeormProjectRepo();
