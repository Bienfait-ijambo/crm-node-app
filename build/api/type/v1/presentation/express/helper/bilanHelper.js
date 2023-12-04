"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSoldInBilan = exports.getPassifMasses = exports.getActifMasses = void 0;
const Mass_1 = require("../../../../../../entities/Mass");
function getActifMasses(arr) {
    return new Promise((resolve) => {
        const actif = arr.filter((item) => item.id == Mass_1.enumMassType.ACTIF_CIRCULANT ||
            item.id == Mass_1.enumMassType.ACTIF_IMMOBILISER ||
            item.id == Mass_1.enumMassType.TRESORERIE_ACTIF);
        resolve(createSoldInBilan(actif));
    });
}
exports.getActifMasses = getActifMasses;
function getPassifMasses(arr) {
    return new Promise((resolve) => {
        const passif = arr.filter((item) => item.id == Mass_1.enumMassType.PASSIF_CIRCULANT ||
            item.id == Mass_1.enumMassType.RESOURCES_DURABLE_ET_EMPRUNTS ||
            item.id == Mass_1.enumMassType.TRESORERIE_PASSIF);
        resolve(createSoldInBilan(passif));
    });
}
exports.getPassifMasses = getPassifMasses;
function createSoldInBilan(arr) {
    const newArr = [];
    // let totalType=0
    for (let i = 0; i < arr.length; i++) {
        const obj = {
            id: arr[i].id,
            name: arr[i].name,
            totalMassAmount: 0,
            account: [],
        };
        for (let j = 0; j < arr[i].account.length; j++) {
            const totalDebit = arr[i].account[j].journals.reduce((acc, currVal) => parseInt(currVal.transactionType) === 1
                ? acc + parseFloat(currVal.amount)
                : acc, 0);
            const totalCredit = arr[i].account[j].journals.reduce((acc, currVal) => parseInt(currVal.transactionType) === 2
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
                name: arr[i].account[j].name,
                code: arr[i].account[j].code,
                totalDebit: totalDebit,
                totalCredit: totalCredit,
                valNet: totalDebit > totalCredit
                    ? (totalDebit - totalCredit).toFixed(2)
                    : (totalCredit - totalDebit).toFixed(2),
            });
        }
        newArr.push(obj);
    }
    return newArr;
}
exports.createSoldInBilan = createSoldInBilan;
//# sourceMappingURL=bilanHelper.js.map