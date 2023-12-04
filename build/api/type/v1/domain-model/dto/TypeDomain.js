"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDomain = void 0;
const AccountType_1 = require("../../../../../entities/AccountType");
const ID_1 = require("../../../../common/domain/ID");
const Name_1 = require("../../../../common/domain/Name");
class TypeDomain {
    static createTypeInput(input) {
        const { name, massId } = this.validateInput(input);
        return new AccountType_1.AccountType(name, 1);
    }
    static validateInput(input) {
        const name = new Name_1.Name(input.name);
        const massId = new ID_1.ID(input.massId);
        return {
            name: name.getName(),
            massId: massId.getId(),
        };
    }
    static updateTypeInput(input) {
        const id = new ID_1.ID(input.id);
        const { name, massId } = this.validateInput(input);
        return {
            id: id.getId(),
            name: name,
            massId: massId,
        };
    }
}
exports.TypeDomain = TypeDomain;
//# sourceMappingURL=TypeDomain.js.map