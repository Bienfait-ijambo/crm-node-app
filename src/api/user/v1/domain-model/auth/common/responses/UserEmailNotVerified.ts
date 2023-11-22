import { CreateClientResponse } from "../../../../../../../shared/response/ClientResponse"



export function UserEmailNotVerified(){
     const res= new CreateClientResponse('Veuillez vérifier votre adrese mail !',422,false,true)
   
     return {
        response: res,
        isValidEmail: false
     }
}