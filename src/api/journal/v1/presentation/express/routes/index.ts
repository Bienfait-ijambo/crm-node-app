import express,{NextFunction, Request,Response} from "express";
import { CreateBalanceReport } from "../usecases/CreateBalanceReport";
import { JwtToken } from "../../../../../../middleware/Jwt";
import { CreateJournalReport } from "../usecases/CreateJournalReport";

const journalRouter = express.Router();

const createJournalReport = new CreateJournalReport();

journalRouter.get("/journals",JwtToken.VerifyExpressToken,  async(req: Request, res: Response, next: NextFunction) => {
   await createJournalReport.getPdf(req, res, next);
});

journalRouter.get("/balance", JwtToken.VerifyExpressToken,CreateBalanceReport.getPdf);


export default journalRouter;
