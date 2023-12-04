"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerDomain = void 0;
const Partner_1 = require("../../../../../entities/Partner");
const Email_1 = require("../../../../common/domain/Email");
const ID_1 = require("../../../../common/domain/ID");
const Name_1 = require("../../../../common/domain/Name");
const Telephone_1 = require("../../../../common/domain/Telephone");
class PartnerDomain {
    static createPartnerInput(input) {
        const { name, email, telephone } = this.validateInput(input);
        const userId = new ID_1.ID(input.userId);
        return new Partner_1.Partner(name, email, telephone, userId.getId());
    }
    static validateInput(input) {
        const email = new Email_1.Email(input.email);
        const name = new Name_1.Name(input.name);
        const telephone = new Telephone_1.Telephone(input.telephone);
        return { name: name.getName(), email: email.getEmail(), telephone: telephone.getTelephone() };
    }
    static updatePartnerInput(input) {
        const id = new ID_1.ID(input.id);
        const { name, email, telephone } = this.validateInput(input);
        return {
            id: id.getId(),
            email: email,
            name: name,
            telephone: telephone
        };
    }
}
exports.PartnerDomain = PartnerDomain;
//# sourceMappingURL=PartnerDomain.js.map