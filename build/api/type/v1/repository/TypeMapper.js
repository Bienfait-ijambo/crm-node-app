"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMapper = void 0;
class TypeMapper {
    static toDto(Type) {
        return {
            id: +Type.id,
            name: Type.name,
        };
    }
}
exports.TypeMapper = TypeMapper;
//# sourceMappingURL=TypeMapper.js.map