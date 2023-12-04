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
exports.AccountType = exports.existingAccountTypes = exports.ACCOUNT_TYPE_SEED_DATA = exports.enumAccountType = void 0;
const typeorm_1 = require("typeorm");
const Mass_1 = require("./Mass");
const Account_1 = require("./Account");
var enumAccountType;
(function (enumAccountType) {
    enumAccountType[enumAccountType["ACTIF"] = 1] = "ACTIF";
    enumAccountType[enumAccountType["PASSIF"] = 2] = "PASSIF";
    enumAccountType[enumAccountType["PRODUIT"] = 3] = "PRODUIT";
    enumAccountType[enumAccountType["CHARGES"] = 4] = "CHARGES";
})(enumAccountType = exports.enumAccountType || (exports.enumAccountType = {}));
exports.ACCOUNT_TYPE_SEED_DATA = [
    {
        id: enumAccountType.ACTIF,
        name: "ACTIF",
        status: 1,
    },
    {
        id: enumAccountType.PASSIF,
        name: "PASSIF",
        status: 1,
    },
    {
        id: enumAccountType.PRODUIT,
        name: "PRODUIT",
        status: 1,
    },
    {
        id: enumAccountType.CHARGES,
        name: "CHARGES",
        status: 1,
    },
];
/**
 * accountType with masses
 */
exports.existingAccountTypes = [
    {
        id: enumAccountType.ACTIF,
        name: "ACTIF",
        masses: [
            { id: Mass_1.enumMassType.ACTIF_IMMOBILISER, name: "ACTIF_IMMOBILISER" },
            {
                id: Mass_1.enumMassType.ACTIF_CIRCULANT,
                name: "ACTIF_CIRCULANT",
            },
            {
                id: Mass_1.enumMassType.TRESORERIE_ACTIF,
                name: "TRESORERIE_ACTIF",
            },
        ],
    },
    {
        id: enumAccountType.PASSIF,
        name: "PASSIF",
        masses: [
            { id: Mass_1.enumMassType.RESOURCES_DURABLE_ET_EMPRUNTS, name: "CAPITAUX_PROPRES" },
            {
                id: Mass_1.enumMassType.PASSIF_CIRCULANT,
                name: "PASSIF_CIRCULANT",
            },
            {
                id: Mass_1.enumMassType.TRESORERIE_PASSIF,
                name: "TRESORERIE_PASSIF",
            },
        ],
    },
    {
        id: enumAccountType.PRODUIT,
        name: "PRODUIT",
        masses: [
            {
                id: Mass_1.enumMassType.PRODUIT_EXPLOITATION,
                name: "PRODUIT_EXPLOITATION",
            },
            {
                id: Mass_1.enumMassType.PRODUIT_EXCEPTIONNELLES,
                name: "PRODUIT_EXCEPTIONNELLES",
            },
            {
                id: Mass_1.enumMassType.PRODUIT_FINANCIERE,
                name: "PRODUIT_FINANCIERE",
            },
        ],
    },
    {
        id: enumAccountType.CHARGES,
        name: "CHARGE",
        masses: [
            {
                id: Mass_1.enumMassType.CHARGES_EXPLOITATION,
                name: "CHARGE_EXPLOITATION",
            },
            {
                id: Mass_1.enumMassType.CHARGES_FINANCIERE,
                name: "CHARGE_FINANCIERE",
            },
            {
                id: Mass_1.enumMassType.CHARGES_EXCEPTIONNELLES,
                name: "CHARGE_EXCEPTIONNELLES",
            }
        ],
    },
];
let AccountType = class AccountType {
    // @ManyToOne(() => Mass, (mass) => mass.mass)
    // mass: Mass
    constructor(name, status) {
        this.name = name;
        //  this.massId=massId
        this.status = status;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AccountType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], AccountType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AccountType.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AccountType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AccountType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], AccountType.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Mass_1.Mass),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], AccountType.prototype, "masses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Account_1.Account, (account) => account.accountType),
    __metadata("design:type", Array)
], AccountType.prototype, "accounts", void 0);
AccountType = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Number])
], AccountType);
exports.AccountType = AccountType;
//# sourceMappingURL=AccountType.js.map