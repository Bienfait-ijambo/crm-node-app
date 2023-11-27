import express,{NextFunction, Request,Response} from "express";
import { CreateTfrReport } from "../usecases/createTfrReport";
import { JwtToken } from "../../../../../middleware/Jwt";
;

/**
 * tfr means : Tableau de formation de résultat par palier
 */
const tfrRouter = express.Router();

// const createJournalReport = new CreateJournalReport();
// ,JwtToken.VerifyExpressToken,
tfrRouter.get("/tfr" ,async(req: Request, res: Response, next: NextFunction) => {
   CreateTfrReport.generatePdf(req, res, next);
});


export default tfrRouter;
