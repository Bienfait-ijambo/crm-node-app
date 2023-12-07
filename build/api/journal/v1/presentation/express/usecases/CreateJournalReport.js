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
exports.CreateJournalReport = void 0;
const util_1 = require("../../../../../../shared/util/util");
const GetUserEnterpiseInfo_1 = require("../../../../../user/v1/domain-model/usecases/GetUserEnterpiseInfo");
const getHtmlContent_1 = require("../../../../../common/pdf/getHtmlContent");
const TypeormUserRepo_1 = require("../../../../../user/v1/repository/TypeormUserRepo");
const BuildJournalArray_1 = require("./helper/BuildJournalArray");
const GetJournalPdfData_1 = require("../../../domain-model/usecases/GetJournalPdfData");
const TypeormJournalRepo_1 = require("../../../repository/TypeormJournalRepo");
const CreatePdfFile_1 = require("../../../../../common/pdf/CreatePdfFile");
class CreateJournalReport extends BuildJournalArray_1.BuildJournalArray {
    getPdf(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { input, journalName } = this.getInput(req);
                const [journalData, htmlContent, headerData] = yield Promise.all([
                    this.getJournalData(input),
                    (0, getHtmlContent_1.getHtmlContent)((0, util_1.getViewPath)("journal.html")),
                    this.getUserEnterpiseInfo(input.userId)
                ]);
                const data = {
                    journalData: journalData,
                    headerData: headerData,
                    date: input,
                    journalName: journalName
                };
                const { clientUrl } = yield (0, CreatePdfFile_1.createPdfFile)(htmlContent, data, headerData, 'journal');
                res.send({ message: "file created", status: 200, filePath: clientUrl });
            }
            catch (error) {
                res.status(422).send({ message: "InvalidData" });
            }
        });
    }
    getJournalData(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const usecase = new GetJournalPdfData_1.GetJournalPdfData(TypeormJournalRepo_1.journalRepo);
            const result = yield usecase.execute(input);
            const data = this.getJournalTransformData(result);
            return data;
        });
    }
    getUserEnterpiseInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new GetUserEnterpiseInfo_1.GetUserEnterpriseInfoUseCase(TypeormUserRepo_1.userRepo);
            const result = yield useCase.execute(userId);
            return result;
        });
    }
    getInput(req) {
        const { startDate, endDate, page, userId, projectId, serviceId, journalName } = req.query;
        const input = {
            page: parseInt(page),
            userId: parseInt(userId),
            startDate: startDate,
            endDate: endDate,
            projectId: parseInt(projectId),
            serviceId: parseInt(serviceId),
            journalName: journalName,
        };
        if (parseInt(projectId) > 0) {
            return { input, journalName: `PROJET : ${journalName}` };
        }
        if (parseInt(serviceId) > 0) {
            return { input, journalName: `SERVICE : ${journalName}` };
        }
        return { input, journalName: '' };
    }
}
exports.CreateJournalReport = CreateJournalReport;
//# sourceMappingURL=CreateJournalReport.js.map