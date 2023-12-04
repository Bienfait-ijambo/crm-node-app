"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MassDomain = void 0;
const Mass_1 = require("../../../../../entities/Mass");
const ID_1 = require("../../../../common/domain/ID");
const Name_1 = require("../../../../common/domain/Name");
class MassDomain {
    static createMassInput(input) {
        const { name } = this.validateInput(input);
        return new Mass_1.Mass(name, 1);
    }
    static validateInput(input) {
        const name = new Name_1.Name(input.name);
        return {
            name: name.getName(),
        };
    }
    static updateMassInput(input) {
        const id = new ID_1.ID(input.id);
        const { name } = this.validateInput(input);
        return {
            id: id.getId(),
            name: name,
        };
    }
}
exports.MassDomain = MassDomain;
//# sourceMappingURL=MassDomain.js.map