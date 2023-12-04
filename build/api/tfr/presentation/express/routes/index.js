"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createTfrReport_1 = require("../usecases/createTfrReport");
;
/**
 * tfr means : Tableau de formation de résultat par palier
 */
const tfrRouter = express_1.default.Router();
// const createJournalReport = new CreateJournalReport();
// ,JwtToken.VerifyExpressToken,
tfrRouter.get("/tfr", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    createTfrReport_1.CreateTfrReport.generatePdf(req, res, next);
}));
exports.default = tfrRouter;
//# sourceMappingURL=index.js.map