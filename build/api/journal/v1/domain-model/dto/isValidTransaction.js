"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTransactionStatus = void 0;
const Journal_1 = require("../../../../../entities/Journal");
function isValidTransactionStatus(target, propertyKey) {
    let value = target[propertyKey];
    const getter = function () {
        return value;
    };
    const setter = function (newValue) {
        if (newValue !== Journal_1.JournalTransactionType.CREDIT && newValue !== Journal_1.JournalTransactionType.CREDIT) {
            throw new Error(`Transaction invalide !.`);
        }
        value = newValue;
    };
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}
exports.isValidTransactionStatus = isValidTransactionStatus;
//# sourceMappingURL=isValidTransaction.js.map