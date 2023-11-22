
import { Service } from "../../../../entities/Service";
import { ServicePayment } from "../../../../entities/ServicePayment";
import { AppDataSource } from "../../../../infrastructure/typeorm/data-source";
import { catchError } from "../../../../shared/exceptions/CachError";
import { DB } from "../../../common/db/DB";
import { ApiResponse } from "../../../common/types/apiResponse";
import { IServicePaymentDto } from "../domain-model/dto/CreateServicePaymentDto";
import { IServicePaymentInput, IUpdateServiceInput } from "../domain-model/usecases/interfaces/serviceInterface";
import { IServiceRepo } from "./IServiceRepo";


export class TypeormServiceRepo implements IServiceRepo {

  private db = new DB<Service>(Service);

  @catchError
  public async createService(Service: Service){
    const result = await this.db.save(Service);
    return result
  }

  @catchError
  public async getServicePayment(input:IServicePaymentInput){
    const PAGE_SIZE = 10;

    const [services, count] = await AppDataSource.getRepository(Service)
      .createQueryBuilder("service")
      .leftJoinAndSelect("service.servicePayment",'servicePayment')
      .where('service.userId = :userId', { userId:input.userId})
      .andWhere('servicePayment.userId = :userId', { userId:input.userId})
      .andWhere('servicePayment.createdAt = :date', { date:input.date})
      .skip((input.page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { services, count, totalPages };
  }

 
  @catchError
  async  createServicePayment(input:IServicePaymentDto):Promise<void> {

   await AppDataSource.createQueryBuilder()
    .insert()
    .into(ServicePayment)
    .values([input])
    .execute();

  }

  @catchError
  public async getServices( name: string, userId:number, page: number ):Promise<ApiResponse<'services',Service[]>> {
    const PAGE_SIZE = 10;

    let serviceName = name.toLowerCase();

    const [services, count] = await AppDataSource.getRepository(Service)
      .createQueryBuilder("service")
      .where("lower(service.name) LIKE :serviceName", { serviceName: `%${serviceName}%` })
      .andWhere('service.userId = :userId', { userId:userId})
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getManyAndCount();

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return { services, count, totalPages };
  }

  @catchError
  public async updateService(input: IUpdateServiceInput):Promise<IUpdateServiceInput> {
    const { id, ...restInput } = input;
    const result = await this.db.update(restInput, id);

    if (!result) throw new Error("Service not found !");

    return input;
  }

  
}

export const serviceRepo= new TypeormServiceRepo();
