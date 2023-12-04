"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CreateBilanPdf_1 = require("../../usecases/CreateBilanPdf");
const Jwt_1 = require("../../../../../../../middleware/Jwt");
const CreateAccountResultPdf_1 = require("../../usecases/CreateAccountResultPdf");
const accountTypeRouter = express_1.default.Router();
accountTypeRouter.get("/bilan", Jwt_1.JwtToken.VerifyExpressToken, CreateBilanPdf_1.CreateBilanPdf.getPdf);
accountTypeRouter.get("/account-result", Jwt_1.JwtToken.VerifyExpressToken, CreateAccountResultPdf_1.CreateAccountResultPdf.getPdf);
exports.default = accountTypeRouter;
//# sourceMappingURL=AccountTypeRoutes.js.map