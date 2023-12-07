"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessGrossMargin = void 0;
const Journal_1 = require("../../../../../../../entities/Journal");
const Trf_1 = require("../../../../../../../entities/Trf");
const filterTfrData_1 = require("../filterTfrData");
const aggregateProcessedTfrData_1 = require("../aggregateProcessedTfrData");
/**
 * process tfr db data
 */
class ProcessGrossMargin {
    static getGrossMargin(TfrData) {
        const array = (0, filterTfrData_1.filterTfrData)(TfrData, "MARGE_BRUTE");
        const transactions = [];
        let totalDebitAmount = 0;
        let totalCreditAmount = 0;
        let sold = {
            amount: '',
            debit: false,
            credit: false,
        };
        for (let i = 0; i < array.length; i++) {
            if (array[i].transactionType === Journal_1.JournalTransactionType.DEBIT) {
                transactions.push({
                    style: "non",
                    resultType: "MARGE_BRUTE",
                    account: array[i].account,
                    accountName: array[i].accountName,
                    debit: array[i].amount,
                    credit: null,
                });
                totalDebitAmount += parseFloat(array[i].amount);
            }
            if (array[i].transactionType === Journal_1.JournalTransactionType.CREDIT) {
                transactions.push({
                    style: "non",
                    resultType: "MARGE_BRUTE",
                    account: array[i].account,
                    accountName: array[i].accountName,
                    debit: null,
                    credit: array[i].amount,
                });
                totalCreditAmount += parseFloat(array[i].amount);
            }
        }
        aggregateProcessedTfrData_1.ProcessTfrResultHelper.calculateSold(totalCreditAmount, totalDebitAmount, sold);
        transactions.push({
            style: "to_bold",
            resultType: "MARGE_BRUTE",
            account: Trf_1.TFR_ACCOUNT.MARGE_BRUTE,
            accountName: "MARGE BRUTE",
            debit: !sold.debit ? sold.amount : '',
            credit: !sold.credit ? sold.amount : '',
        });
        return transactions;
    }
}
exports.ProcessGrossMargin = ProcessGrossMargin;
//# sourceMappingURL=processGrossMarginData.js.map