import express, { NextFunction, Request, Response }from "express";
import passportGoogle from "../../../domain-model/auth/login/GoogleStrategy";
import passportLinkenIn from "../../../domain-model/auth/login/LinkedInStrategy";

const authRouter = express.Router();

/* --------------------------------------------------------------------------------Google login route
* --------------------------------------------------------------------------------------------------
*/
authRouter.get('/google', passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));


// Google callback route
authRouter.get('/google/callback', passportGoogle.authenticate('google', {
  successRedirect: '/auth/dashboard',
  failureRedirect: '/auth/login'   // to add login redirect
}));

/* -------------------------------------------------------------------------------------------------
* --------------------------------------------------------------------------------------------------
*/



authRouter.get('/linkedin',passportLinkenIn.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    
  });

authRouter.get('/linkedin/callback', passportLinkenIn.authenticate('linkedin', {
  successRedirect: '/auth/dashboard',
  failureRedirect: '/login'  // to add login redirect
}));



authRouter.get('/dashboard',(req,res,next)=>{

  const clientUrl=process.env.CLIENT_URL

  const sessionData = req?.session as any

  const userProviderId=sessionData?.passport?.user

  if(typeof userProviderId !== 'undefined'){

    if(userProviderId!='ERROR'){
      res.redirect(`${clientUrl}oAuthData/${userProviderId}`);
    }else{
      res.status(401).send({message:"STR__ERROR__::"})
    }
     
  }else{
    res.status(401).send({message:"unauthorized"})
  }

})




export default authRouter;
