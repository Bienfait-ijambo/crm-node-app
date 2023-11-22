import { userRepo } from "../../repository/TypeormUserRepo";
import { LoginUserUseCase } from "../../domain-model/auth/login/LoginUser";
import { JwtToken } from "../../../../../middleware/Jwt";

export const authMutations = {

  Mutation:{
    loginUser: async (root, { input }) => {
      const usecase = new LoginUserUseCase(userRepo);
      const result= await usecase.execute(input);
     return result
    },

    loginUserViaOAuth:async(root,{userProviderId})=>{
      const usecase = new LoginUserUseCase(userRepo);
      const result= await usecase.loginUserViaOAuth(userProviderId)
     return result
    },
    getTokens: async (root, { token }) => {
      const payload:any = await JwtToken.verifyRefreshToken(token)
      const accessToken = await JwtToken.signAccessToken(payload.aud.toString())
      const refreshToken = await JwtToken.signRefreshToken(payload.aud.toString())
      return { accessToken, refreshToken }
      
    },
  }
 
};
