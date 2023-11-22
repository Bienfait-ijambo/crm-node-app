import { userRepo } from "../../../repository/TypeormUserRepo";
import { CreateUserUseCase } from "../../usecases/CreateUser";
import { IGoogleStrategy } from "../interfaces/IGoogleStrategy";
import { getGoogleStrategyData } from "./helper/getGoogleStrategyData";

const passportGoogle = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passportGoogle.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const googleInput = getGoogleStrategyData(profile);

        const useCase = new CreateUserUseCase(userRepo);
        const randomIdPlusOAuthProviderId =
          await useCase.createUserViaPassportStrategies(googleInput);

        return cb(null, randomIdPlusOAuthProviderId);
      } catch (error) {
        return cb(null, "ERROR");
      }
    }
  )
);

passportGoogle.serializeUser((user, done) => {
  done(null, user);
});

passportGoogle.deserializeUser((user, done) => {
  done(null, user);
});

export default passportGoogle;
