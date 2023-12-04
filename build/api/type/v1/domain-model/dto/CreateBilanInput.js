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
exports.CreateBilanInput = void 0;
const Number_1 = require("../../../../common/customer-decorators/Number");
const Required_1 = require("../../../../common/customer-decorators/Required");
class CreateBilanInput {
    constructor(input) {
        this.page = input.page;
        this.userId = input.userId;
        this.startDate = input.startDate;
        this.endDate = input.endDate;
    }
    getInput() {
        return {
            page: this.page,
            userId: this.userId,
            startDate: this.startDate,
            endDate: this.endDate
        };
    }
}
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateBilanInput.prototype, "page", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateBilanInput.prototype, "userId", void 0);
__decorate([
    (0, Required_1.Required)(10, 10),
    __metadata("design:type", String)
], CreateBilanInput.prototype, "startDate", void 0);
__decorate([
    (0, Required_1.Required)(10, 10),
    __metadata("design:type", String)
], CreateBilanInput.prototype, "endDate", void 0);
exports.CreateBilanInput = CreateBilanInput;
//# sourceMappingURL=CreateBilanInput.js.map