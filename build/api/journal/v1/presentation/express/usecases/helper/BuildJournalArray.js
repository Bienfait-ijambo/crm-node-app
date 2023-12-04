"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildJournalArray = void 0;
const Journal_1 = require("../../../../../../../entities/Journal");
class BuildJournalArray {
    getDebitOperation(journal, index, newJournalArray) {
        if (journal[index].transactionType === Journal_1.JournalTransactionType.DEBIT) {
            const debit = {
                accountCode: journal[index].account.code,
                amount: journal[index].amount,
                name: journal[index].account.name,
                date: journal[index].createdAt
            };
            const credit = {
                accountCode: "",
                amount: "",
                name: "",
            };
            newJournalArray.push({
                idOp: journal[index].transactionCode,
                description: journal[index].description,
                operations: [{ debit: debit, credit: credit }],
            });
        }
    }
    getCreditOperation(journal, index, newJournalArray) {
        if (journal[index].transactionType === Journal_1.JournalTransactionType.CREDIT) {
            const debit = {
                accountCode: "",
                amount: "",
                name: "",
                date: ""
            };
            const credit = {
                accountCode: journal[index].account.code,
                amount: journal[index].amount,
                name: journal[index].account.name,
            };
            newJournalArray.push({
                idOp: journal[index].transactionCode,
                description: journal[index].description,
                operations: [{ debit: debit, credit: credit }],
            });
        }
    }
    getTransaction(newJournal, index, journal) {
        const getOperation = newJournal.filter((operation) => operation.idOp == journal[index].transactionCode);
        return getOperation;
    }
    pushDebitOperationToTransaction(newJournal, index, journal, getOperation) {
        if (journal[index].transactionType === Journal_1.JournalTransactionType.DEBIT) {
            const debit = {
                accountCode: journal[index].account.code,
                amount: journal[index].amount,
                name: journal[index].account.name,
                date: journal[index].createdAt
            };
            const credit = {
                accountCode: "",
                amount: "",
                name: "",
            };
            const updateOperation = getOperation[0].operations.push({
                debit: debit,
                credit: credit,
            });
            newJournal.push(updateOperation);
        }
    }
    pushCreditOperationToTransaction(newJournal, index, journal, getOperation) {
        if (journal[index].transactionType === Journal_1.JournalTransactionType.CREDIT) {
            const debit = {
                accountCode: "",
                amount: "",
                name: "",
                date: ""
            };
            const credit = {
                accountCode: journal[index].account.code,
                amount: journal[index].amount,
                name: journal[index].account.name,
            };
            const updateOperation = getOperation[0].operations.push({
                debit: debit,
                credit: credit,
            });
            newJournal.push(updateOperation);
        }
    }
    getJournalTransformData(journalData) {
        const journal = journalData;
        const newJournal = [];
        for (let i = 0; i < journal.length; i++) {
            if (newJournal.length > 0) {
                const getOperation = this.getTransaction(newJournal, i, journal);
                if (getOperation.length > 0) {
                    this.pushDebitOperationToTransaction(newJournal, i, journal, getOperation);
                    this.pushCreditOperationToTransaction(newJournal, i, journal, getOperation);
                }
                else {
                    //not found 
                    this.getDebitOperation(journal, i, newJournal);
                    this.getCreditOperation(journal, i, newJournal);
                }
            }
            else {
                this.getDebitOperation(journal, i, newJournal);
                this.getCreditOperation(journal, i, newJournal);
            }
        }
        return newJournal;
    }
}
exports.BuildJournalArray = BuildJournalArray;
//# sourceMappingURL=BuildJournalArray.js.map