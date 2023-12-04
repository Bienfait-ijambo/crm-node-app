"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountResultPdf = void 0;
const TypeormTypeRepo_1 = require("../../../repository/TypeormTypeRepo");
const CachError_1 = require("../../../../../../shared/exceptions/CachError");
const util_1 = require("../../../../../../shared/util/util");
const TypeormUserRepo_1 = require("../../../../../user/v1/repository/TypeormUserRepo");
const GetUserEnterpiseInfo_1 = require("../../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo");
const CreatePdfFile_1 = require("../../../../../common/pdf/CreatePdfFile");
const getHtmlContent_1 = require("../../../../../common/pdf/getHtmlContent");
const CreateAccountResult_1 = require("../../../domain-model/usecases/CreateAccountResult");
const CreateAccountResultInput_1 = require("../../../domain-model/dto/CreateAccountResultInput");
const accountResultHelper_1 = require("../helper/accountResultHelper");
const logger_1 = require("../../../../../../infrastructure/graphql-server/winston/logger");
class CreateAccountResultPdf {
    static createInputFromRequest(req) {
        var _a, _b, _c, _d;
        const startDate = (_a = req.query) === null || _a === void 0 ? void 0 : _a.startDate;
        const enDate = (_b = req.query) === null || _b === void 0 ? void 0 : _b.endDate;
        const page = (_c = req.query) === null || _c === void 0 ? void 0 : _c.page;
        const userId = (_d = req.query) === null || _d === void 0 ? void 0 : _d.userId;
        return {
            page: parseInt(page),
            userId: parseInt(userId.toString()),
            startDate: startDate,
            endDate: enDate,
        };
    }
    static getPdf(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = CreateAccountResultPdf.createInputFromRequest(req);
                const dto = new CreateAccountResultInput_1.CreateAccountResultInput(input);
                const [masses, htmlContent, headerData] = yield Promise.all([
                    CreateAccountResultPdf.getAccountResultData(dto.getInput()),
                    (0, getHtmlContent_1.getHtmlContent)((0, util_1.getViewPath)("accountResult.html")),
                    CreateAccountResultPdf.getUserEnterpiseInfo(input.userId),
                ]);
                const { chargeAccounts, produitAccounts, result } = yield CreateAccountResultPdf.getAcccountResult(masses);
                const data = {
                    chargeAccounts: chargeAccounts,
                    produitAccounts: produitAccounts,
                    result: result,
                    headerData: headerData,
                    date: input,
                };
                const { clientUrl } = yield (0, CreatePdfFile_1.createPdfFile)(htmlContent, data, headerData, "accountResult");
                res.send({ message: "file created", status: 200, filePath: clientUrl });
            }
            catch (error) {
                res.status(422).send({ message: "InvalidData" });
            }
        });
    }
    static getAcccountResult(masses) {
        try {
            const chargeAccounts = (0, accountResultHelper_1.getChargeAccount)(masses);
            const produitAccounts = (0, accountResultHelper_1.getProduitAccount)(masses);
            const accountAmount = accountResultHelper_1.totalChargeAndProductAmount;
            return new Promise((resolve) => {
                const result = accountAmount.totalProduitAmount > accountAmount.totalChargeAmount
                    ? "Benefice : " +
                        (accountAmount.totalProduitAmount -
                            accountAmount.totalChargeAmount)
                    : "Perte : " +
                        (accountAmount.totalChargeAmount -
                            accountAmount.totalProduitAmount);
                resolve({ chargeAccounts, produitAccounts, result });
            });
        }
        catch (error) {
            (0, logger_1.logErrorToFile)("Error while creating account-result-pdf", "account-result-pdf-error");
        }
    }
    static getAccountResultData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new CreateAccountResult_1.CreateAccountResultUseCase(TypeormTypeRepo_1.TypeRepo);
            const { masses } = yield useCase.execute(input);
            return masses;
        });
    }
    static getUserEnterpiseInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new GetUserEnterpiseInfo_1.GetUserEnterpriseInfoUseCase(TypeormUserRepo_1.userRepo);
            const result = yield useCase.execute(userId);
            return result;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateAccountResultPdf, "getAccountResultData", null);
exports.CreateAccountResultPdf = CreateAccountResultPdf;
//# sourceMappingURL=CreateAccountResultPdf.js.map