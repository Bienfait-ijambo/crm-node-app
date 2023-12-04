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
exports.CreateBalanceReport = void 0;
const CreateBalanceInput_1 = require("../../../domain-model/dto/CreateBalanceInput");
const CachError_1 = require("../../../../../../shared/exceptions/CachError");
const util_1 = require("../../../../../../shared/util/util");
const TypeormUserRepo_1 = require("../../../../../user/v1/repository/TypeormUserRepo");
const GetBalance_1 = require("../../../domain-model/usecases/GetBalance");
const TypeormJournalRepo_1 = require("../../../repository/TypeormJournalRepo");
const GetUserEnterpiseInfo_1 = require("../../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo");
const getHtmlContent_1 = require("../../../../../common/pdf/getHtmlContent");
const CreatePdfFile_1 = require("../../../../../common/pdf/CreatePdfFile");
class CreateBalanceReport {
    static getPdf(req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = (_a = req.query) === null || _a === void 0 ? void 0 : _a.startDate;
                const enDate = (_b = req.query) === null || _b === void 0 ? void 0 : _b.endDate;
                const page = (_c = req.query) === null || _c === void 0 ? void 0 : _c.page;
                const userId = (_d = req.query) === null || _d === void 0 ? void 0 : _d.userId;
                const input = {
                    page: parseInt(page),
                    userId: parseInt(userId),
                    startDate: startDate,
                    endDate: enDate,
                };
                const dto = new CreateBalanceInput_1.CreateGetBalanceInput(input);
                const [htmlContent, headerData, bilan] = yield Promise.all([
                    (0, getHtmlContent_1.getHtmlContent)((0, util_1.getViewPath)("balance.html")),
                    CreateBalanceReport.getUserEnterpiseInfo(input.userId),
                    CreateBalanceReport.getBalanceData(dto.getBilanInput())
                ]);
                const data = {
                    transactions: bilan.transactions,
                    debitAmount: bilan.debitAmount,
                    creditAmount: bilan.creditAmount,
                    headerData: headerData,
                    date: input
                };
                const { clientUrl } = yield (0, CreatePdfFile_1.createPdfFile)(htmlContent, data, headerData, 'balance');
                res.send({ message: "file created", status: 200, filePath: clientUrl });
            }
            catch (error) {
                res.status(422).send({ message: "InvalidData" });
            }
        });
    }
    static getBalanceData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new GetBalance_1.GetBalanceUseCase(TypeormJournalRepo_1.journalRepo);
            const { journals } = yield useCase.execute(input);
            const transactions = journals.map((item) => {
                const sold = item.totalIncome > item.totalExpense ? '(SD)' : '(SC)';
                const finalSold = (item.totalIncome - item.totalExpense).toFixed(2);
                return {
                    accountCode: item.accountCode,
                    accountName: item.accountName,
                    accountType: item.accountType,
                    massName: item.massName,
                    totalIncome: item.totalIncome == 0 ? '--' : item.totalIncome.toFixed(2),
                    totalExpense: item.totalExpense == 0 ? '--' : item.totalExpense.toFixed(2),
                    finalSold: finalSold + ' ' + sold
                };
            });
            const debitAmount = CreateBalanceReport.getTotalDebitAmount(journals);
            const creditAmount = CreateBalanceReport.getTotalCreditAmount(journals);
            return { transactions, debitAmount, creditAmount };
        });
    }
    static getUserEnterpiseInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new GetUserEnterpiseInfo_1.GetUserEnterpriseInfoUseCase(TypeormUserRepo_1.userRepo);
            const result = yield useCase.execute(userId);
            return result;
        });
    }
    static getTotalDebitAmount(arr) {
        let amount = 0;
        for (let i = 0; i < arr.length; i++) {
            amount += arr[i].totalIncome;
        }
        return amount.toFixed(2);
    }
    static getTotalCreditAmount(arr) {
        let amount = 0;
        for (let i = 0; i < arr.length; i++) {
            amount += arr[i].totalExpense;
        }
        return amount.toFixed(2);
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateBalanceReport, "getBalanceData", null);
exports.CreateBalanceReport = CreateBalanceReport;
//# sourceMappingURL=CreateBalanceReport.js.map