"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MassMapper = void 0;
class MassMapper {
    static toDto(mass) {
        return {
            id: +mass.id,
            name: mass.name,
            status: mass.status
        };
    }
    static fromEntity(masses) {
        return masses.map((mass) => {
            return MassMapper.toDto(mass);
        });
    }
}
exports.MassMapper = MassMapper;
//# sourceMappingURL=MassMapper.js.map