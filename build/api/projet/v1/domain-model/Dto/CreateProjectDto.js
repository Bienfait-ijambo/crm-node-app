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
exports.CreateProjectDto = void 0;
const Project_1 = require("../../../../../entities/Project");
const Number_1 = require("../../../../common/customer-decorators/Number");
const Required_1 = require("../../../../common/customer-decorators/Required");
class CreateProjectDto {
    constructor(input) {
        this.paidAmount = 0;
        this.designation = input.designation;
        this.amount = '0';
        this.partnerId = input.partnerId;
        this.userId = input.userId;
        this.status = input.status;
    }
    getInsertInput() {
        const paidAmount = this.getPaidAmount();
        return new Project_1.Project(this.designation, this.amount, paidAmount, this.partnerId, this.userId, Project_1.ProjectStatus.PENDING);
    }
    getPaidAmount() {
        return this.paidAmount.toString();
    }
}
__decorate([
    (0, Required_1.Required)(5, 60),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "designation", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", String)
], CreateProjectDto.prototype, "amount", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "partnerId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "userId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "status", void 0);
exports.CreateProjectDto = CreateProjectDto;
//# sourceMappingURL=CreateProjectDto.js.map