"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessBilanTypes = void 0;
const AccountType_1 = require("../../../../entities/AccountType");
const Journal_1 = require("../../../../entities/Journal");
const Mass_1 = require("../../../../entities/Mass");
class ProcessBilanTypes {
    processPassifAccount({ arr, i, aggregateInput, returnAggregateInput, error }) {
        if (arr[i].transactionType == Journal_1.JournalTransactionType.CREDIT && arr[i].accountType == AccountType_1.enumAccountType.PASSIF) {
            //add
            this.addAccountAmount({ arr, i, aggregateInput, returnAggregateInput, error });
        }
        else if (arr[i].transactionType == Journal_1.JournalTransactionType.DEBIT && arr[i].accountType == AccountType_1.enumAccountType.PASSIF) {
            //decrease
            this.reduceAccountAmount({ arr, i, aggregateInput, returnAggregateInput, error });
        }
    }
    processActifAccount({ arr, i, aggregateInput, returnAggregateInput, error }) {
        if (arr[i].transactionType === Journal_1.JournalTransactionType.DEBIT && arr[i].massId === Mass_1.enumMassType.TRESORERIE_ACTIF) {
            //add
            this.addAccountAmount({ arr, i, aggregateInput, returnAggregateInput, error });
        }
        else if (arr[i].transactionType == Journal_1.JournalTransactionType.CREDIT && arr[i].massId == Mass_1.enumMassType.TRESORERIE_ACTIF) {
            //decrease
            this.reduceAccountAmount({ arr, i, aggregateInput, returnAggregateInput, error });
        }
    }
    /**
     *
     * @param arr
     * @param i
     * @param aggregateInput
     * @param returnAggregateInput
     */
    addAccountAmount({ arr, i, aggregateInput, returnAggregateInput, error }) {
        if (aggregateInput[i].accountId === arr[i].accountId) {
            returnAggregateInput[i].totalAmount += parseFloat(arr[i].amount);
        }
    }
    /**
     *
     * @param arr
     * @param i
     * @param aggregateInput
     * @param returnAggregateInput
     * @param error
     */
    reduceAccountAmount({ arr, i, aggregateInput, returnAggregateInput, error }) {
        if (aggregateInput[i].accountId === arr[i].accountId) {
            if (returnAggregateInput[i].totalAmount >= parseFloat(arr[i].amount)) {
                returnAggregateInput[i].totalAmount -= parseFloat(arr[i].amount);
            }
            else {
                error.push({ error: "" });
            }
        }
    }
}
exports.ProcessBilanTypes = ProcessBilanTypes;
//# sourceMappingURL=ProcessBilanTypes.js.map