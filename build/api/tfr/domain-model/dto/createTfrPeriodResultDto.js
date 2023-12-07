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
exports.CreateTfrPeriodResultDto = void 0;
const PeriodicTfrResult_1 = require("../../../../entities/PeriodicTfrResult");
const decorators_1 = require("../../../../shared/dto-validator-class/src/decorators");
const ValidateClassProperty_1 = require("../../../../shared/dto-validator-class/src/validators/ValidateClassProperty");
const generateOpt_1 = require("../../../../shared/util/generateOpt");
class CreateTfrPeriodResultDto {
    constructor(input) {
        this.userId = input.userId;
        this.name = input.name;
        this.status = input.status;
        this.resultDate = input.resultDate;
    }
    getInput() {
        const randomNumber = (0, generateOpt_1.generateRandomNumber)(6);
        const code = `${randomNumber}-${this.resultDate}`;
        return new PeriodicTfrResult_1.PeriodicTfrResult(this.name, this.resultDate, this.status, code, this.userId);
    }
    validate() {
        const validator = new ValidateClassProperty_1.ValidateClassProperty(this);
        const input = validator.verify(validator.validate());
        return Promise.resolve(input).catch((error) => error);
    }
}
__decorate([
    (0, decorators_1.Required)({
        message: "veuillez entre le nom du résultat",
        Length: {
            min: 3,
            max: 50,
        },
    }),
    __metadata("design:type", String)
], CreateTfrPeriodResultDto.prototype, "name", void 0);
__decorate([
    (0, decorators_1.IsNumber)({
        message: "Le statut doit être en chiffre",
    }),
    __metadata("design:type", Number)
], CreateTfrPeriodResultDto.prototype, "status", void 0);
__decorate([
    (0, decorators_1.Required)({
        message: "veuillez entre la date",
        Length: {
            min: 5,
            max: 15,
        },
    }),
    __metadata("design:type", String)
], CreateTfrPeriodResultDto.prototype, "resultDate", void 0);
__decorate([
    (0, decorators_1.IsNumber)({
        message: "UserId must be a number",
    }),
    __metadata("design:type", Number)
], CreateTfrPeriodResultDto.prototype, "userId", void 0);
exports.CreateTfrPeriodResultDto = CreateTfrPeriodResultDto;
//# sourceMappingURL=createTfrPeriodResultDto.js.map