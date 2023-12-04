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
exports.CreateUpdateAccountInput = void 0;
const Number_1 = require("../../../../common/customer-decorators/Number");
const Required_1 = require("../../../../common/customer-decorators/Required");
class CreateUpdateAccountInput {
    constructor(input) {
        this.typeId = input.typeId;
        this.massId = input.massId;
        this.name = input.name;
        this.id = input.id;
        this.code = input.code;
    }
    getInput() {
        return {
            id: this.id,
            name: this.name,
            code: this.code,
            typeId: this.typeId,
            massId: this.massId,
        };
    }
}
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateUpdateAccountInput.prototype, "id", void 0);
__decorate([
    (0, Required_1.Required)(4, 100),
    __metadata("design:type", String)
], CreateUpdateAccountInput.prototype, "name", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", String)
], CreateUpdateAccountInput.prototype, "code", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateUpdateAccountInput.prototype, "typeId", void 0);
__decorate([
    Number_1.isNumber,
    __metadata("design:type", Number)
], CreateUpdateAccountInput.prototype, "massId", void 0);
exports.CreateUpdateAccountInput = CreateUpdateAccountInput;
//# sourceMappingURL=CreateUpdateAccountInput.js.map