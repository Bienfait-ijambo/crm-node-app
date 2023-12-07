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
exports.CreateSingleAccountReport = void 0;
const util_1 = require("../../../../../../shared/util/util");
const CreatePdfFile_1 = require("../../../../../common/pdf/CreatePdfFile");
const getHtmlContent_1 = require("../../../../../common/pdf/getHtmlContent");
// import { ProcessSingleAccountTransaction } from "./helper/processor/processSingleAccountTransactions";
const singleAccountTransaction_1 = require("../test-data/singleAccountTransaction");
const node_worker_threads_1 = require("node:worker_threads");
const node_child_process_1 = require("node:child_process");
const rootPath = process.cwd();
const worker = new node_worker_threads_1.Worker(`${rootPath}/build/api/journal/v1/presentation/express/usecases/helper/processor/processSingleAccountTransactions.js`);
const child = (0, node_child_process_1.fork)(`${rootPath}/build/api/journal/v1/presentation/express/usecases/helper/processor/processSingleAccountTransactions.js`);
class CreateSingleAccountReport {
    static generatePdf(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const {input,journalName} = this.getInput(req);
                const [journalData, htmlContent, headerData] = yield Promise.all([
                    // this.getJournalData(input),
                    {},
                    (0, getHtmlContent_1.getHtmlContent)((0, util_1.getViewPath)("singleAccountReport.html")),
                    // this.getUserEnterpiseInfo(input.userId)
                    {},
                ]);
                //   const accounT = ProcessSingleAccountTransaction.execute(
                //     singleAccountResultTestData
                //   );
                //   console.log(accounT);
                child.on("message", (result) => __awaiter(this, void 0, void 0, function* () {
                    const data = {
                        accountData: result === null || result === void 0 ? void 0 : result.res,
                        accountSold: [
                            {
                                debit: {
                                    amount: "500 (SD)",
                                },
                                credit: {
                                    amount: "500 (",
                                },
                            },
                        ],
                        headerData: {},
                        // journalName:journalName
                    };
                    const { clientUrl } = yield (0, CreatePdfFile_1.createPdfFile)(htmlContent, data, headerData, "singleAccountReport");
                    res.send({ message: "file created", status: 200, filePath: clientUrl });
                }));
                //   worker.on('error', (error)=>{
                //     res.status(422).send({ message: `error-in worker : ${error.message}-${error.stack}` });
                //   });
                //pass data to the worker thread
                child.send(singleAccountTransaction_1.singleAccountResultTestData);
            }
            catch (error) {
                res.status(422).send({ message: `error : ${error.message}-${error.stack}` });
            }
        });
    }
}
exports.CreateSingleAccountReport = CreateSingleAccountReport;
//# sourceMappingURL=CreateSingleAccountReport.js.map