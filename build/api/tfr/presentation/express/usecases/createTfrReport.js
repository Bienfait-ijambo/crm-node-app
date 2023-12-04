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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTfrReport = void 0;
const GetUserEnterpiseInfo_1 = require("../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo");
const TypeormUserRepo_1 = require("../../../../user/v1/repository/TypeormUserRepo");
const CreatePdfFile_1 = require("../../../../common/pdf/CreatePdfFile");
const util_1 = require("../../../../../shared/util/util");
const getHtmlContent_1 = require("../../../../common/pdf/getHtmlContent");
const getTfrData_1 = require("../../../domain-model/usecases/getTfrData");
const TypeormTFRRepo_1 = require("../../../repository/TypeormTFRRepo");
const createGetTfrDataInput_1 = require("../../../domain-model/dto/createGetTfrDataInput");
const aggregateProcessedTfrData_1 = require("./helpers/aggregateProcessedTfrData");
class CreateTfrReport {
    static getInputFromRequest(req) {
        var _a, _b;
        const period = (_a = req.query) === null || _a === void 0 ? void 0 : _a.period;
        const userId = (_b = req.query) === null || _b === void 0 ? void 0 : _b.userId;
        const input = {
            userId: parseInt(userId),
            period: period,
        };
        return input;
    }
    static generatePdf(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = new createGetTfrDataInput_1.CreateGetTFRDataInput(CreateTfrReport.getInputFromRequest(req));
                yield dto.validate();
                const [htmlContent, headerData, tfrData] = yield Promise.all([
                    (0, getHtmlContent_1.getHtmlContent)((0, util_1.getViewPath)("tfr.html")),
                    CreateTfrReport.getUserEnterpiseInfo(1),
                    CreateTfrReport.getTfrData(dto.getInput()),
                ]);
                const process = new aggregateProcessedTfrData_1.AggregateTfrProcessedData(tfrData);
                const data = {
                    tfrData: process.execute(),
                    headerData: headerData,
                    date: {},
                };
                const { clientUrl } = yield (0, CreatePdfFile_1.createPdfFile)(htmlContent, data, headerData, "tfr");
                res.send({ message: "file created", status: 200, filePath: clientUrl });
            }
            catch (error) {
                res.status(422).send({ message: "InvalidData" });
            }
        });
    }
    static getTfrData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new getTfrData_1.GetTfrDataUseCase(TypeormTFRRepo_1.tfrRepo);
            const result = yield useCase.execute(input);
            return result;
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
exports.CreateTfrReport = CreateTfrReport;
//# sourceMappingURL=createTfrReport.js.map