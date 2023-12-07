"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessTfrResultHelper = exports.AggregateTfrProcessedData = void 0;
const ProcessNetOperatingIncome_1 = require("./processors/ProcessNetOperatingIncome");
const processGrossMarginData_1 = require("./processors/processGrossMarginData");
const processGrossOperatingIncome_1 = require("./processors/processGrossOperatingIncome");
const processNetResult_1 = require("./processors/processNetResult");
const processProfitBeforeTax_1 = require("./processors/processProfitBeforeTax");
const processValueAddedData_1 = require("./processors/processValueAddedData");
class AggregateTfrProcessedData {
    constructor(array) {
        this.array = array;
        this.sold = {
            amount: '',
            debit: false,
            credit: false,
        };
        this.array = array;
    }
    execute() {
        const grossMargin = processGrossMarginData_1.ProcessGrossMargin.getGrossMargin(this.array);
        const valueAdded = processValueAddedData_1.ProcessValueAdded.getValuedAdded(this.array);
        const processGrossOperatingIncome = processGrossOperatingIncome_1.ProcessGrossOperatingIncome.getData(this.array);
        const netOperatingIncome = ProcessNetOperatingIncome_1.ProcessNetOperatingIncome.getData(this.array);
        const profitBeforeTax = processProfitBeforeTax_1.ProcessProfitBeforeTax.getData(this.array);
        const netResult = processNetResult_1.ProcessNetResult.getData(this.array);
        return [
            ...grossMargin,
            ...valueAdded,
            ...processGrossOperatingIncome,
            ...netOperatingIncome,
            ...profitBeforeTax,
            ...netResult
        ];
    }
}
exports.AggregateTfrProcessedData = AggregateTfrProcessedData;
class ProcessTfrResultHelper {
    static calculateSold(totalDebitAmount, totalCreditAmount, sold) {
        // let transactionType: journalTransactionValType;
        if (totalDebitAmount > totalCreditAmount) {
            sold.amount += totalDebitAmount - totalCreditAmount;
            sold.debit = true;
            // transactionType = JournalTransactionType.DEBIT;
        }
        else {
            sold.amount += totalCreditAmount - totalDebitAmount;
            sold.credit = true;
            // transactionType = JournalTransactionType.CREDIT;
        }
    }
}
exports.ProcessTfrResultHelper = ProcessTfrResultHelper;
//# sourceMappingURL=aggregateProcessedTfrData.js.map