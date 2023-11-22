import { EnterpriseInfo } from "../../../../../../entities/EnterpriseInfo";
import { User } from "../../../../../../entities/User";
import { CreateClientResponse } from "../../../../../../shared/response/ClientResponse";

export interface ILoginResponse {
    response: CreateClientResponse;
    user: User;
    permissions: IUserPermission[];
    enterpriseInfo: EnterpriseInfo;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}


export interface IUserPermission{
    id:number
    name:number
    userId:number
    actions:Array<{
        id:number
        name:string
    }>
  }
  


