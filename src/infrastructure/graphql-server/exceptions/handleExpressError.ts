import { logErrorToFile } from "../winston/logger";

export const handleExpressError =  (err, req, res, next) => {
  // Check if the error is an authentication-related error
  if (err) {
    // Handle the authentication error here
    if (err.name == "AuthorizationError") {
      const clientUrl = process.env.CLIENT_URL;
     return res.redirect(`${clientUrl}`);
    } else {
      return res.status(500).json({ error: err.name ,message:"Express error, check it out Ben !"});
    }
  }

  next(err);
};
