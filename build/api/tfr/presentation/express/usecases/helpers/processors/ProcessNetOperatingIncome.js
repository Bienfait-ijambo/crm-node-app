"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNetOperatingIncome = void 0;
const Journal_1 = require("../../../../../../../entities/Journal");
const Trf_1 = require("../../../../../../../entities/Trf");
const filterTfrData_1 = require("../filterTfrData");
class ProcessNetOperatingIncome {
    static getData(TfrData) {
        const array = (0, filterTfrData_1.filterTfrData)(TfrData, 'RESULTAT_NET_D_EXPLOITATION');
        const transactions = [];
        let totalDebitAmount = 0;
        let totalCreditAmount = 0;
        let sold = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].transactionType === Journal_1.JournalTransactionType.DEBIT) {
                transactions.push({
                    style: "non",
                    resultType: "RESULTAT_NET_D_EXPLOITATION",
                    account: array[i].account,
                    designation: "--- com",
                    debit: array[i].amount,
                    credit: null,
                });
                totalDebitAmount += parseFloat(array[i].amount);
            }
            if (array[i].transactionType === Journal_1.JournalTransactionType.CREDIT) {
                transactions.push({
                    style: "non",
                    resultType: "RESULTAT_NET_D_EXPLOITATION",
                    account: array[i].account,
                    designation: "--- com",
                    debit: null,
                    credit: array[i].amount,
                });
                totalCreditAmount += parseFloat(array[i].amount);
            }
        }
        //
        let transactionType;
        if (totalDebitAmount > totalCreditAmount) {
            sold += totalDebitAmount - totalCreditAmount;
            transactionType = Journal_1.JournalTransactionType.DEBIT;
        }
        else {
            sold += totalCreditAmount - totalDebitAmount;
            transactionType = Journal_1.JournalTransactionType.CREDIT;
        }
        transactions.push({
            style: "to_bold",
            resultType: "RESULTAT_NET_D_EXPLOITATION",
            account: Trf_1.TFR_ACCOUNT.RESULTAT_NET_D_EXPLOITATION,
            designation: "RESULTAT_NET_D_EXPLOITATION",
            debit: sold,
            credit: sold,
        });
        return transactions;
    }
}
exports.ProcessNetOperatingIncome = ProcessNetOperatingIncome;
//# sourceMappingURL=ProcessNetOperatingIncome.js.map