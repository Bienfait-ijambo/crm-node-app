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
exports.UpdateServiceDto = void 0;
const Number_1 = require("./../../../../common/customer-decorators/Number");
const CreateServiceDto_1 = require("./CreateServiceDto");
class UpdateServiceDto extends CreateServiceDto_1.CreateServiceDto {
    constructor(input) {
        super(input);
        this.id = input.id;
    }
    getUpdateInput() {
        return {
            id: this.id,
            name: this.name
        };
    }
}
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], UpdateServiceDto.prototype, "id", void 0);
exports.UpdateServiceDto = UpdateServiceDto;
//# sourceMappingURL=UpdateServiceDto.js.map