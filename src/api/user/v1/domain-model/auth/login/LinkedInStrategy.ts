import { logErrorToFile } from "../../../../../../infrastructure/graphql-server/winston/logger";
import { userRepo } from "../../../repository/TypeormUserRepo";
import { CreateUserUseCase } from "../../usecases/CreateUser";
import { ILinkedInStrategy } from "../interfaces/ILinkinStrategy";
import { getLinkedStrategyData } from "./helper/getLinkedStrategyData";

const passportLinkenIn = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passportLinkenIn.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_KEY,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: process.env.LINKEDIN_CALL_BACK_URL,
      scope: ["r_emailaddress", "r_liteprofile"],
      state: process.env.NODE_ENV==='production' ? true:false //handle csrf attack
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(async function () {

        try {

          const linkedInput = getLinkedStrategyData(profile);
     

          const useCase = new CreateUserUseCase(userRepo);
          const randomIdPlusOAuthProviderId =
            await useCase.createUserViaPassportStrategies(linkedInput);
  
          return done(null, randomIdPlusOAuthProviderId);
          
        } catch (error) {
          return done(null, "ERROR");
        }

      
      });
    }
  )
);

passportLinkenIn.serializeUser((user, done) => {
  done(null, user);
});

passportLinkenIn.deserializeUser((user, done) => {
  done(null, user);
});

export default passportLinkenIn;
