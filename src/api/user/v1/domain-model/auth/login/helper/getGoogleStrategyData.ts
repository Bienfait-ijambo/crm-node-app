import { logErrorToFile } from "../../../../../../../infrastructure/graphql-server/winston/logger";
import { IGoogleStrategy } from "../../interfaces/IGoogleStrategy";

export function getGoogleStrategyData(profile:any){
    try {
        const input:IGoogleStrategy={
            id:profile?.id,
            displayName:profile?.displayName,
            name:{familyName:'',givenName:''},
            email:profile?.emails[0].value,
            photo:profile?.photos[0].value
        }
        return input
    } catch (error) {
        logErrorToFile( error.message,'GoogleStrategy-input-error')
    }

}

