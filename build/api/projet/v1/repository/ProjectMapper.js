"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMapper = void 0;
class ProjectMapper {
    static toDto(Project) {
        return {
            id: +Project.id,
            designation: Project.designation,
            amount: Project.amount,
            partnerId: Project.partnerId,
            userId: Project.userId,
            status: Project.status,
        };
    }
}
exports.ProjectMapper = ProjectMapper;
//# sourceMappingURL=ProjectMapper.js.map