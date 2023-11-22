
import { AppDataSource } from "../../../infrastructure/typeorm/data-source";
import { catchError } from "../../../shared/exceptions/CachError";
import { IPageRepo } from "./IPageRepo";

export class TypeormPageRepo implements IPageRepo {

  @catchError
  async getPages() {
    const query = `
        SELECT "client_pages"."pageName" ->>'id' as "id",
"client_pages"."pageName" ->>'name' as "name","client_pages"."pageName" ->'actions' as actions,"client_pages"."pageName" ->>'displayName' as "displayName"   FROM client_pages
        `;
    const result = await AppDataSource.query(query);
  
    return result;
  }
  

}

export const pageRepo=new TypeormPageRepo()
