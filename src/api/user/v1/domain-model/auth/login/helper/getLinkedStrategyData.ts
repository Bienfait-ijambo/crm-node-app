import { logErrorToFile } from "../../../../../../../infrastructure/graphql-server/winston/logger"
import { ILinkedInStrategy } from "../../interfaces/ILinkinStrategy"

export function getLinkedStrategyData(profile:any){
    try {
        const input:ILinkedInStrategy={
            id:profile?.id,
            displayName:profile?.displayName,
            name:{familyName:'',givenName:''},
            email:profile?.emails[0].value,
            photo:profile?.photos[1].value
        }
        return input
        
    } catch (error) {
        logErrorToFile( error,'linkedinStrate-input-error')
    }
   
  }