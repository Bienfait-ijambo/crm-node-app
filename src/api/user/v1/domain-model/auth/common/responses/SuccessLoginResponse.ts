import { CreateClientResponse } from "../../../../../../../shared/response/ClientResponse"

export function successLoginResponse(){
    const res= new CreateClientResponse(`Your welcome !`,200,true,true)
   return res
}