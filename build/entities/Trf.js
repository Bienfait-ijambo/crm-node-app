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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tfr = exports.SOLD_STOCK = exports.SOLD_MERCHENDISE = exports.getTfrResultTypeByCode = exports.TfrResultType = exports.TFR_ACCOUNT = void 0;
const typeorm_1 = require("typeorm");
var TFR_ACCOUNT;
(function (TFR_ACCOUNT) {
    TFR_ACCOUNT[TFR_ACCOUNT["MARGE_BRUTE"] = 80] = "MARGE_BRUTE";
    TFR_ACCOUNT[TFR_ACCOUNT["VALEUR_AJOUTER"] = 81] = "VALEUR_AJOUTER";
    TFR_ACCOUNT[TFR_ACCOUNT["RESULTAT_BRUT_D_EXPLOITATION"] = 83] = "RESULTAT_BRUT_D_EXPLOITATION";
    TFR_ACCOUNT[TFR_ACCOUNT["RESULTAT_NET_D_EXPLOITATION"] = 84] = "RESULTAT_NET_D_EXPLOITATION";
    TFR_ACCOUNT[TFR_ACCOUNT["RESULTAT_AVANT_CONTRIBUTION_SUR_BENEFICE"] = 85] = "RESULTAT_AVANT_CONTRIBUTION_SUR_BENEFICE";
    TFR_ACCOUNT[TFR_ACCOUNT["RESULTAT_NET"] = 13] = "RESULTAT_NET";
})(TFR_ACCOUNT = exports.TFR_ACCOUNT || (exports.TFR_ACCOUNT = {}));
exports.TfrResultType = [
    { name: "MARGE_BRUTE", val: 1, code: 80 },
    { name: "VALEUR_AJOUTER", val: 2, code: 81 },
    { name: "RESULTAT_BRUT_D_EXPLOITATION", val: 3, code: 83 },
    { name: "RESULTAT_NET_D_EXPLOITATION", val: 4, code: 84 },
    { name: "RESULTAT_AVANT_CONTRIBUTION_SUR_BENEFICE", val: 5, code: 85 },
    { name: "RESULTAT_NET", val: 6, code: 13 },
];
/**
 *
 * @param code
 * @returns {object} of name,code,val
 */
function getTfrResultTypeByCode(code) {
    const result = exports.TfrResultType.filter((item) => item.code === code);
    if (result.length > 0) {
        return {
            name: result[0].name,
            code: result[0].code,
            val: result[0].val,
        };
    }
    return;
}
exports.getTfrResultTypeByCode = getTfrResultTypeByCode;
/**
 * in french : vente marchandise
 */
exports.SOLD_MERCHENDISE = 70;
/**
 * in french: stock - vendu
 */
exports.SOLD_STOCK = 60;
/**
 * Tableau de formation de résultat
 *
 *
 * This table holds TfrResultAccountOperations
 */
let Tfr = class Tfr {
    constructor(account, transactionType, accountName, resultType, amount, periodCode, userId) {
        this.account = account;
        this.resultType = resultType;
        this.transactionType = transactionType;
        this.amount = amount;
        this.userId = userId;
        this.periodCode = periodCode;
        this.accountName = accountName;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tfr.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tfr.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tfr.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tfr.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tfr.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tfr.prototype, "resultType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tfr.prototype, "periodCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tfr.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Tfr.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tfr.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Tfr.prototype, "deletedAt", void 0);
Tfr = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, Number])
], Tfr);
exports.Tfr = Tfr;
//# sourceMappingURL=Trf.js.map