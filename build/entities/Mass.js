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
exports.Mass = exports.MASSES = exports.enumMassType = void 0;
const typeorm_1 = require("typeorm");
const Account_1 = require("./Account");
var enumMassType;
(function (enumMassType) {
    enumMassType[enumMassType["ACTIF_IMMOBILISER"] = 1] = "ACTIF_IMMOBILISER";
    enumMassType[enumMassType["ACTIF_CIRCULANT"] = 2] = "ACTIF_CIRCULANT";
    enumMassType[enumMassType["TRESORERIE_ACTIF"] = 3] = "TRESORERIE_ACTIF";
    enumMassType[enumMassType["RESOURCES_DURABLE_ET_EMPRUNTS"] = 4] = "RESOURCES_DURABLE_ET_EMPRUNTS";
    enumMassType[enumMassType["PASSIF_CIRCULANT"] = 5] = "PASSIF_CIRCULANT";
    enumMassType[enumMassType["TRESORERIE_PASSIF"] = 6] = "TRESORERIE_PASSIF";
    enumMassType[enumMassType["CHARGES_EXPLOITATION"] = 7] = "CHARGES_EXPLOITATION";
    enumMassType[enumMassType["CHARGES_FINANCIERE"] = 8] = "CHARGES_FINANCIERE";
    enumMassType[enumMassType["CHARGES_EXCEPTIONNELLES"] = 9] = "CHARGES_EXCEPTIONNELLES";
    enumMassType[enumMassType["PRODUIT_EXPLOITATION"] = 10] = "PRODUIT_EXPLOITATION";
    enumMassType[enumMassType["PRODUIT_FINANCIERE"] = 11] = "PRODUIT_FINANCIERE";
    enumMassType[enumMassType["PRODUIT_EXCEPTIONNELLES"] = 12] = "PRODUIT_EXCEPTIONNELLES";
})(enumMassType = exports.enumMassType || (exports.enumMassType = {}));
exports.MASSES = [
    {
        id: enumMassType.ACTIF_IMMOBILISER,
        name: "ACTIF_IMMOBILISER",
        status: 1,
    },
    {
        id: enumMassType.ACTIF_CIRCULANT,
        name: "ACTIF_CIRCULANT",
        status: 1,
    },
    {
        id: enumMassType.TRESORERIE_ACTIF,
        name: "TRESORERIE_ACTIF",
        status: 1,
    },
    {
        id: enumMassType.RESOURCES_DURABLE_ET_EMPRUNTS,
        name: "CAPITAUX_PROPRES",
        status: 1,
    },
    {
        id: enumMassType.PASSIF_CIRCULANT,
        name: "PASSIF_CIRCULANT",
        status: 1,
    },
    {
        id: enumMassType.TRESORERIE_PASSIF,
        name: "TRESORERIE_PASSIF",
        status: 1,
    },
    {
        id: enumMassType.CHARGES_EXPLOITATION,
        name: "CHARGES_EXPLOITATION",
        status: 1,
    },
    {
        id: enumMassType.CHARGES_FINANCIERE,
        name: "CHARGES_FINANCIERE",
        status: 1,
    },
    {
        id: enumMassType.CHARGES_EXCEPTIONNELLES,
        name: "CHARGES_EXCEPTIONNELLES",
        status: 1,
    },
    {
        id: enumMassType.PRODUIT_EXPLOITATION,
        name: "PRODUIT_EXPLOITATION",
        status: 1,
    },
    {
        id: enumMassType.PRODUIT_FINANCIERE,
        name: "PRODUIT_FINANCIERE",
        status: 1,
    },
    {
        id: enumMassType.PRODUIT_EXCEPTIONNELLES,
        name: "PRODUIT_EXCEPTIONNELLES",
        status: 1,
    },
];
let Mass = class Mass {
    constructor(name, status) {
        this.name = name;
        this.status = status;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Mass.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], Mass.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Mass.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Mass.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Mass.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Mass.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Account_1.Account, (account) => account.mass),
    __metadata("design:type", Array)
], Mass.prototype, "account", void 0);
Mass = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Number])
], Mass);
exports.Mass = Mass;
//# sourceMappingURL=Mass.js.map