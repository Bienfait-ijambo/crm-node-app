"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasuryOperation = void 0;
class TreasuryOperation {
    constructor(arr) {
        this.arr = arr;
        this.arr = arr;
    }
    getTreasuryInput() {
        const treasuryInput = [];
        for (let i = 0; i < this.arr.length; i++) {
            treasuryInput.push({
                accountId: this.arr[i].accountId,
                totalAmount: this.arr[i].amount,
                userId: this.arr[i].userId,
                transactionType: this.arr[i].transactionType
            });
        }
        return treasuryInput;
    }
    aggregateAccountAmount() {
    }
}
exports.TreasuryOperation = TreasuryOperation;
//# sourceMappingURL=TreasuryOperation.js.map