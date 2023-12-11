import express, { NextFunction, Request, Response } from "express";
import { CreateBalanceReport } from "../usecases/CreateBalanceReport";
import { JwtToken } from "../../../../../../middleware/Jwt";
import { CreateJournalReport } from "../usecases/CreateJournalReport";
import { DeleteTransaction } from "../usecases/deleteTransaction";
import { CreateSingleAccountReport } from "../usecases/CreateSingleAccountReport";

const journalRouter = express.Router();

const createJournalReport = new CreateJournalReport();

journalRouter.get(
  "/journals",
  JwtToken.VerifyExpressToken,
  async (req: Request, res: Response, next: NextFunction) => {
    await createJournalReport.getPdf(req, res, next);
  }
);

journalRouter.get(
  "/balance",
  JwtToken.VerifyExpressToken,
  CreateBalanceReport.getPdf
);

journalRouter.post(
  "/journals/delete/transactions",
  JwtToken.VerifyExpressToken,
  async (req: Request, res: Response, next: NextFunction) => {
    DeleteTransaction.execute(req, res, next);
  }
);


journalRouter.get(
   "/journals/single/account/result",
  
   async (req: Request, res: Response, next: NextFunction) => {
    const result=new CreateSingleAccountReport()
   await result.execute(req, res, next);
   }
 );



export default journalRouter;
