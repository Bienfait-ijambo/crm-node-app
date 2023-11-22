
import { logErrorToFile } from "../../../infrastructure/graphql-server/winston/logger";
import { AppDataSource } from "../../../infrastructure/typeorm/data-source";
import { catchError } from "../../../shared/exceptions/CachError";


export   interface IwhereOptions{
    [key:string]:any
  }

export class DB<Entity> {

  private entity: Entity;

  public queryBuilder: any;

  public repo

  


  /**
 * @descr this DB class use Orm Query Builder interface
 * @constructor takes an entity as parameter
 *
 */
  constructor(entity: any) {
    this.entity = entity;

    this.repo = AppDataSource.getRepository(entity);
    this.queryBuilder = AppDataSource.createQueryBuilder();
  }

  @catchError
  public async save<Dto>(data: Dto): Promise<Entity> {
   
    const result = await this.repo.save(data);
    return result;
  }

  @catchError
  public async update<T>(data: T, id: number): Promise<Boolean> {

      const result = await this.queryBuilder
        .update(this.entity)
        .set(data)
        .where("id = :id", { id: +id })
        .execute();
      return result.affected === 1 ? true : false;
  
  }

  @catchError
  public async delete(id: number): Promise<Boolean> {
    try {
      const result = await this.queryBuilder
        .delete()
        .from(this.entity)
        .where("id = :id", { id: id })
        .execute();
      if (result) return true;
    } catch (error) {
      console.log(error);
    }
  }


  @catchError
  public async get(tableName:string):Promise<Entity[]>{
   try {
    const result = await this.repo
    .createQueryBuilder(tableName)
    .getMany()
    return result
    
   } catch (error) {
    console.log(error);
   }
  }

  @catchError
  public async getOne<T,returnType>(id:T,tableName:string):Promise<returnType>{
    try {
      const result = await this.repo
      .createQueryBuilder(tableName)
      .where(`${tableName}.id = :id`, { id: id })
      .getOne()
      return result
      
    } catch (error) {
      console.log(error);
    }
  }



 
  public async getOneByColumnName<Entity>(tableName:string,columnName:string,whereOptions:IwhereOptions): Promise<Entity>{
try {
  const result = await this.repo
  .createQueryBuilder(tableName)
  .where(`${tableName}.${columnName} = :${columnName}`, whereOptions)
  .getOne()
  return result
} catch (error) {
  logErrorToFile(error,'logg-error-3')
}
    

  }

  @catchError
  public async getMany<returnType>(tableName:string,columns?:string[]):Promise<returnType>{
      const result = await this.repo
      .createQueryBuilder(tableName)
      .select(columns)
      .getMany()
      return result
      
  }
}


