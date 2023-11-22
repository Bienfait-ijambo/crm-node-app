import { IProjectDto } from "../domain-model/Dto/IProjectDto";
import { IAffectProjectAmountInput, IGetProjectIdAndNameInput, IUpdateProjectInput } from "../domain-model/usecases/interfaces/projectInterfaces";
import { Project } from "../../../../entities/Project";
import { IGetTotalPaidInput, IcreateProjectPayementInput } from "../domain-model/usecases/interfaces/projectPaymentInterfaces";
import { ProjectPayment } from "../../../../entities/ProjectPayment";



export interface IProjectRepo{

  createProject(input:Project):Promise<IProjectDto>

  updateProject(input:IUpdateProjectInput): Promise<IUpdateProjectInput>

  getProjects(name:string,userId:number,page:number):Promise<{ projects: Project[]; count: number,totalPages:number }>

  getProjetNameAndId(input:IGetProjectIdAndNameInput):Promise<{ projects: Project[]}>

  createProjectPayment(input: IcreateProjectPayementInput): Promise<ProjectPayment>

  getTotalProjectPaidAmount(input:IGetTotalPaidInput): Promise<ProjectPayment | null>
  

  updatePaidAmountField(amount:number,projectId:number):Promise<void>

  getProjectAmount(projectId:number,userId:number):Promise<Project>

  affectAmountToProject(amount:number,projectId:number): Promise<boolean>


  /**
   * 
   * @param projectId 
   * change project status to finished
   */
  changeProjectStatus(projectId:number):Promise<void>



}