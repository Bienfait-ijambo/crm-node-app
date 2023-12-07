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
const CreateBalanceReport_1 = require("../usecases/CreateBalanceReport");
const Jwt_1 = require("../../../../../../middleware/Jwt");
const CreateJournalReport_1 = require("../usecases/CreateJournalReport");
const deleteTransaction_1 = require("../usecases/deleteTransaction");
const CreateSingleAccountReport_1 = require("../usecases/CreateSingleAccountReport");
const journalRouter = express_1.default.Router();
const createJournalReport = new CreateJournalReport_1.CreateJournalReport();
journalRouter.get("/journals", Jwt_1.JwtToken.VerifyExpressToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield createJournalReport.getPdf(req, res, next);
}));
journalRouter.get("/balance", Jwt_1.JwtToken.VerifyExpressToken, CreateBalanceReport_1.CreateBalanceReport.getPdf);
journalRouter.post("/journals/delete/transactions", Jwt_1.JwtToken.VerifyExpressToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    deleteTransaction_1.DeleteTransaction.execute(req, res, next);
}));
journalRouter.get("/journals/single/account/result", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    CreateSingleAccountReport_1.CreateSingleAccountReport.generatePdf(req, res, next);
}));
exports.default = journalRouter;
//# sourceMappingURL=index.js.map