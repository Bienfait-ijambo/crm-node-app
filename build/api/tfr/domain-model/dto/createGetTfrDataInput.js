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
exports.CreateGetTFRDataInput = void 0;
const decorators_1 = require("../../../../shared/dto-validator-class/src/decorators");
const ValidateClassProperty_1 = require("../../../../shared/dto-validator-class/src/validators/ValidateClassProperty");
class CreateGetTFRDataInput {
    constructor(input) {
        this.userId = input.userId;
        this.period = input.period;
    }
    getInput() {
        return {
            userId: this.userId,
            period: this.period
        };
    }
    validate() {
        const validator = new ValidateClassProperty_1.ValidateClassProperty(this);
        const input = validator.verify(validator.validate());
        return Promise.resolve(input).catch(error => error);
    }
}
__decorate([
    (0, decorators_1.IsNumber)({
        message: "UserId must be a number"
    }),
    __metadata("design:type", Number)
], CreateGetTFRDataInput.prototype, "userId", void 0);
__decorate([
    (0, decorators_1.Required)({
        message: "veuillez entre la période",
        Length: {
            min: 3,
            max: 15,
        },
    }),
    __metadata("design:type", String)
], CreateGetTFRDataInput.prototype, "period", void 0);
exports.CreateGetTFRDataInput = CreateGetTFRDataInput;
//# sourceMappingURL=createGetTfrDataInput.js.map