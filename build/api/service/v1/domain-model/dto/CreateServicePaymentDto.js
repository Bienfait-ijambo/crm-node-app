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
exports.CreateServicePaymentDto = exports.paymentServiceStatus = void 0;
const Number_1 = require("../../../../common/customer-decorators/Number");
var paymentServiceStatus;
(function (paymentServiceStatus) {
    paymentServiceStatus[paymentServiceStatus["GAIN"] = 1] = "GAIN";
    paymentServiceStatus[paymentServiceStatus["EXPENSE"] = 0] = "EXPENSE";
    paymentServiceStatus[paymentServiceStatus["NO_GAIN_AND_NO_EXPENSE"] = 2] = "NO_GAIN_AND_NO_EXPENSE";
})(paymentServiceStatus = exports.paymentServiceStatus || (exports.paymentServiceStatus = {}));
class CreateServicePaymentDto {
    constructor(input) {
        this.amount = input.amount;
        this.serviceId = input.serviceId;
        this.userId = input.userId;
        this.createdAt = input.createdAt;
    }
    getInput_Without_Date(status) {
        return {
            serviceId: this.serviceId,
            amount: this.amount,
            userId: this.userId,
            status: status
        };
    }
    getInput_With_Date(status) {
        return {
            serviceId: this.serviceId,
            amount: this.amount,
            userId: this.userId,
            status: status,
            createdAt: this.createdAt
        };
    }
}
__decorate([
    Number_1.isNumber,
    __metadata("design:type", String)
], CreateServicePaymentDto.prototype, "amount", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateServicePaymentDto.prototype, "serviceId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateServicePaymentDto.prototype, "userId", void 0);
exports.CreateServicePaymentDto = CreateServicePaymentDto;
//# sourceMappingURL=CreateServicePaymentDto.js.map