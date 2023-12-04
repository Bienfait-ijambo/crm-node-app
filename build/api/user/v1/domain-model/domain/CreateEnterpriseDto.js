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
exports.CreateEnterpiseDto = void 0;
const EnterpriseInfo_1 = require("../../../../../entities/EnterpriseInfo");
const Number_1 = require("../../../../common/customer-decorators/Number");
const Required_1 = require("../../../../common/customer-decorators/Required");
class CreateEnterpiseDto {
    constructor(input) {
        this.input = input;
        this.input = input;
    }
    getInput() {
        return new EnterpriseInfo_1.EnterpriseInfo(this.input.userId, this.input.name, this.input.email, this.input.telephone, this.input.taxNumberId, this.input.rccm, this.input.idNat);
    }
}
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateEnterpiseDto.prototype, "userId", void 0);
__decorate([
    (0, Required_1.Required)(3, 50),
    __metadata("design:type", String)
], CreateEnterpiseDto.prototype, "name", void 0);
__decorate([
    (0, Required_1.Required)(5, 50),
    __metadata("design:type", String)
], CreateEnterpiseDto.prototype, "email", void 0);
__decorate([
    (0, Required_1.Required)(9, 15),
    __metadata("design:type", String)
], CreateEnterpiseDto.prototype, "telephone", void 0);
__decorate([
    (0, Required_1.Required)(3, 50),
    __metadata("design:type", String)
], CreateEnterpiseDto.prototype, "taxNumberId", void 0);
__decorate([
    (0, Required_1.Required)(3, 50),
    __metadata("design:type", String)
], CreateEnterpiseDto.prototype, "rccm", void 0);
__decorate([
    (0, Required_1.Required)(3, 50),
    __metadata("design:type", String)
], CreateEnterpiseDto.prototype, "idNat", void 0);
exports.CreateEnterpiseDto = CreateEnterpiseDto;
//# sourceMappingURL=CreateEnterpriseDto.js.map