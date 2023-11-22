

import express from "express";
import { UploadUserPhoto } from "../usecases/UploadUserImage";
import { UploadUserEnterpriseLogo } from "../usecases/UploadUserEnterPriseLogo";
import { JwtToken } from "../../../../../../middleware/Jwt";



const userRoutes = express.Router();

userRoutes.post("/upload-image",JwtToken.VerifyExpressToken, UploadUserPhoto.upload);
userRoutes.post('/upload-logo',JwtToken.VerifyExpressToken,UploadUserEnterpriseLogo.upload)




export default userRoutes;
