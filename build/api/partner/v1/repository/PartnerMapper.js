"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerMapper = void 0;
class PartnerMapper {
    static toDto(partner) {
        return {
            id: +partner.id,
            name: partner.name,
            email: partner.email,
            telephone: partner.telephone,
            userId: partner.userId
        };
    }
}
exports.PartnerMapper = PartnerMapper;
//# sourceMappingURL=PartnerMapper.js.map