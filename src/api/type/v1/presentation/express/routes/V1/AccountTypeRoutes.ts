import express from "express";
import { CreateBilanPdf } from "../../usecases/CreateBilanPdf";
import { JwtToken } from "../../../../../../../middleware/Jwt";
import { CreateAccountResultPdf } from "../../usecases/CreateAccountResultPdf";

const accountTypeRouter = express.Router();

accountTypeRouter.get("/bilan",JwtToken.VerifyExpressToken,CreateBilanPdf.getPdf);
accountTypeRouter.get("/account-result",JwtToken.VerifyExpressToken,CreateAccountResultPdf.getPdf);




export default accountTypeRouter;

