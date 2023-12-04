"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccountResultArray = exports.getProduitAccount = exports.getChargeAccount = exports.totalChargeAndProductAmount = void 0;
const Journal_1 = require("../../../../../../entities/Journal");
const Mass_1 = require("../../../../../../entities/Mass");
const util_1 = require("../../../../../../shared/util/util");
exports.totalChargeAndProductAmount = {
    totalChargeAmount: 0,
    totalProduitAmount: 0
};
//  enumAccountType.PRODUIT
function getChargeAccount(arr) {
    const chargeAccount = arr.filter((item) => item.id == Mass_1.enumMassType.CHARGES_EXPLOITATION ||
        item.id == Mass_1.enumMassType.CHARGES_FINANCIERE ||
        item.id == Mass_1.enumMassType.CHARGES_EXCEPTIONNELLES);
    const result = createAccountResultArray(chargeAccount);
    exports.totalChargeAndProductAmount.totalChargeAmount = result.length > 0 ? result[0].totalMassAmount : 0;
    return result;
}
exports.getChargeAccount = getChargeAccount;
function getProduitAccount(arr) {
    const produitAccount = arr.filter((item) => item.id == Mass_1.enumMassType.PRODUIT_EXPLOITATION ||
        item.id == Mass_1.enumMassType.PRODUIT_FINANCIERE ||
        item.id == Mass_1.enumMassType.PRODUIT_EXCEPTIONNELLES);
    const result = createAccountResultArray(produitAccount);
    exports.totalChargeAndProductAmount.totalProduitAmount = result.length > 0 ? result[0].totalMassAmount : 0;
    return result;
}
exports.getProduitAccount = getProduitAccount;
function createAccountResultArray(arr) {
    const newArr = [];
    // let totalType=0
    for (let i = 0; i < arr.length; i++) {
        const obj = {
            id: arr[i].id,
            massName: arr[i].name,
            totalMassAmount: 0,
            account: [],
        };
        for (let j = 0; j < arr[i].account.length; j++) {
            const totalDebit = arr[i].account[j].journals.reduce((acc, currVal) => parseInt(currVal.transactionType) === Journal_1.JournalTransactionType.DEBIT
                ? acc + parseFloat(currVal.amount)
                : acc, 0);
            const totalCredit = arr[i].account[j].journals.reduce((acc, currVal) => parseInt(currVal.transactionType) === Journal_1.JournalTransactionType.CREDIT
                ? acc + parseFloat(currVal.amount)
                : acc, 0);
            if (totalDebit > totalCredit) {
                obj.totalMassAmount += totalDebit - totalCredit;
            }
            else {
                obj.totalMassAmount += totalCredit - totalDebit;
            }
            obj.account.push({
                id: arr[i].account[j].id,
                accountName: arr[i].account[j].name,
                code: arr[i].account[j].code,
                totalDebit: totalDebit.toFixed(2),
                totalCredit: totalCredit.toFixed(2),
                valNet: totalDebit > totalCredit
                    ? (0, util_1.truncNumber)((totalDebit - totalCredit)) + '(SD)'
                    : (0, util_1.truncNumber)((totalCredit - totalDebit)) + '(SC)'
            });
        }
        newArr.push(obj);
    }
    return newArr;
}
exports.createAccountResultArray = createAccountResultArray;
//# sourceMappingURL=accountResultHelper.js.map