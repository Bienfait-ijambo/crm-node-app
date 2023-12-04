"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJournalDto = void 0;
const Journal_1 = require("../../../../../entities/Journal");
const util_1 = require("../../../../../shared/util/util");
const Number_1 = require("../../../../common/customer-decorators/Number");
const isValidTransaction_1 = require("./isValidTransaction");
class CreateJournalDto {
    constructor(arr) {
        //
        this.input = [];
        const transCode = this.generateTransCode();
        if (arr[0].serviceId === 0 && arr[0].projectId === 0)
            throw new Error('Veuillez selectionner un project ou service !');
        if (arr[0].description.length >= 5 && arr[0].description.length <= 40) {
            for (let i = 0; arr.length > i; i++) {
                this.accountId = arr[i].accountId;
                this.massId = arr[i].massId;
                this.description = arr[i].description;
                this.createdAt = arr[i].createdAt;
                this.projectId = arr[i].projectId;
                this.serviceId = arr[i].serviceId;
                this.amount = arr[i].amount;
                this.transactionType = arr[i].transactionType;
                this.income = arr[i].income;
                this.transactionType = arr[i].transactionType;
                this.expense = arr[i].expense;
                this.userId = arr[i].userId;
                this.userId = arr[i].userId;
                this.draw = arr[i].draw,
                    this.input.push({
                        id: i,
                        accountId: arr[i].accountId,
                        massId: arr[i].massId,
                        description: arr[i].description,
                        createdAt: arr[i].createdAt,
                        projectId: arr[i].projectId,
                        serviceId: arr[i].serviceId,
                        accountType: arr[i].accountType,
                        amount: arr[i].amount,
                        transactionType: arr[i].transactionType,
                        income: arr[i].income,
                        expense: arr[i].expense,
                        draw: arr[i].draw,
                        transactionCode: transCode,
                        userId: arr[i].userId,
                    });
            }
        }
        else {
            throw new Error('La description doit etre entre 5 et 40 charactès !');
        }
    }
    getTransaction() {
        const debit = Journal_1.JournalTransactionType.DEBIT;
        const credit = Journal_1.JournalTransactionType.CREDIT;
        return { debit: debit, credit: credit };
    }
    getInsertInput() {
        const { arr, error } = this.checkValidTransaction();
        if (error > 0)
            throw new Error("Transaction invalide");
        if (!this.isDebitSoldIsEqualToCredit(arr))
            throw new Error("Le montant de debit doit être equal ou montant de credit !");
        arr[arr.length - 1].draw = true;
        const arrWithDateOrWithoutDate = this.addOrRemoveDateProperty(arr);
        return arrWithDateOrWithoutDate;
    }
    /**
     * remove CreatedAt property from array
     */
    addOrRemoveDateProperty(arr) {
        const newArray = [];
        for (let i = 0; i < arr.length; i++) {
            const _a = arr[i], { createdAt } = _a, restProps = __rest(_a, ["createdAt"]);
            if (createdAt !== '') {
                newArray.push(Object.assign({ createdAt }, restProps));
            }
            else {
                newArray.push(Object.assign({}, restProps));
            }
        }
        return newArray;
    }
    checkValidTransaction() {
        const arr = this.input;
        let error = 0;
        const { debit, credit } = this.getTransaction();
        for (let i = 0; arr.length > i; i++) {
            delete arr[i].id;
            if (arr[i].transactionType === debit || arr[i].transactionType === credit) {
                if (arr[i].transactionType === debit) {
                    arr[i].income = arr[i].amount;
                    arr[i].expense = "0";
                }
                if (arr[i].transactionType === credit) {
                    arr[i].expense = arr[i].amount;
                    arr[i].income = "0";
                }
            }
            else {
                error++;
            }
        }
        return {
            arr: arr,
            error: error,
        };
    }
    isDebitSoldIsEqualToCredit(arr) {
        const { debit } = this.getTransaction();
        const debitTransactions = [];
        const creditTransactions = [];
        //separate transaction
        for (let i = 0; arr.length > i; i++) {
            if (arr[i].transactionType === debit) {
                debitTransactions.push(parseFloat(arr[i].amount));
            }
            else {
                creditTransactions.push(parseFloat(arr[i].amount));
            }
        }
        if (debitTransactions.length > 0 && creditTransactions.length > 0) {
            let totalDebit = 0;
            let totalCredit = 0;
            //get total
            totalDebit = debitTransactions.reduce((acc, currValue) => acc + currValue);
            totalCredit = creditTransactions.reduce((acc, currValue) => acc + currValue);
            return totalCredit === totalDebit ? true : false;
        }
        else {
            return false;
        }
    }
    generateTransCode() {
        return (0, util_1.generateCode)();
    }
}
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateJournalDto.prototype, "accountId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateJournalDto.prototype, "massId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", String)
], CreateJournalDto.prototype, "amount", void 0);
__decorate([
    Number_1.isNumber,
    isValidTransaction_1.isValidTransactionStatus,
    __metadata("design:type", Number)
], CreateJournalDto.prototype, "transactionType", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateJournalDto.prototype, "userId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateJournalDto.prototype, "projectId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateJournalDto.prototype, "serviceId", void 0);
exports.CreateJournalDto = CreateJournalDto;
//# sourceMappingURL=CreateJournalDto.js.map