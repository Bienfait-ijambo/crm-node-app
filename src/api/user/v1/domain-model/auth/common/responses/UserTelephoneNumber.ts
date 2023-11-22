import { CreateClientResponse } from "../../../../../../../shared/response/ClientResponse"

export function UserTelephoneNumberIsInvalid(){
    const res= new CreateClientResponse('User telephone number not verified',422,false,false)
    return {
       response: res
    }
}