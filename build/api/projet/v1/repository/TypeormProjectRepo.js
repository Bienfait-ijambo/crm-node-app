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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepo = exports.TypeormProjectRepo = void 0;
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const Project_1 = require("../../../../entities/Project");
const CachError_1 = require("../../../../shared/exceptions/CachError");
const DB_1 = require("../../../common/db/DB");
const ProjectMapper_1 = require("./ProjectMapper");
const ProjectPayment_1 = require("../../../../entities/ProjectPayment");
class TypeormProjectRepo {
    constructor() {
        this.db = new DB_1.DB(Project_1.Project);
    }
    createProject(Project) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.save(Project);
            return ProjectMapper_1.ProjectMapper.toDto(result);
        });
    }
    getProjetNameAndId(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [projects] = yield data_source_1.AppDataSource.getRepository(Project_1.Project)
                .createQueryBuilder("project")
                .select(["project.id", "project.designation"])
                .where("lower(project.designation) LIKE :designation", { designation: `%${input.designation}%` })
                .andWhere('project.userId = :userId', { userId: input.userId })
                // .andWhere('project.status = :status', { status:ProjectStatus.PENDING})
                .take(10)
                .getManyAndCount();
            return { projects };
        });
    }
    getProjectAmount(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(Project_1.Project)
                .createQueryBuilder("project")
                .select(["project.amount", "project.paidAmount"])
                .where("project.id = :id", { id: projectId })
                .andWhere("project.userId = :userId", { userId: userId })
                .orderBy('project.id', 'DESC')
                .getOne();
            return result;
        });
    }
    getTotalProjectPaidAmount(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(ProjectPayment_1.ProjectPayment)
                .createQueryBuilder("project_payment")
                .select("SUM(CAST(project_payment.amount AS FLOAT))", "totalPaidAmount")
                .where("project_payment.projectId = :projectId", { projectId: input.projectId })
                .andWhere("project_payment.userId = :userId", { userId: input.userId })
                .getOne();
            return result;
        });
    }
    createProjectPayment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new ProjectPayment_1.ProjectPayment(input.projectId, input.amount, input.userId);
            const result = data_source_1.AppDataSource.getRepository(ProjectPayment_1.ProjectPayment).save(data);
            return result;
        });
    }
    getProjects(name, userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            let projectName = name.toLowerCase();
            const [projects, count] = yield data_source_1.AppDataSource.getRepository(Project_1.Project)
                .createQueryBuilder("project")
                .leftJoinAndSelect("project.partner", 'partner')
                .leftJoinAndSelect("project.projectPayment", 'projectPayment')
                .where("lower(project.designation) LIKE :designation", { designation: `%${projectName}%` })
                .andWhere('project.userId = :userId', { userId: userId })
                .skip((page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { projects, count, totalPages };
        });
    }
    updateProject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount } = input, restInput = __rest(input, ["id", "amount"]);
            const result = yield this.db.update(restInput, id);
            if (!result)
                throw new Error("Project not found !");
            return input;
        });
    }
    affectAmountToProject(amount, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.update({ amount: amount }, projectId);
            return result ? true : false;
        });
    }
    updatePaidAmountField(paidAmount, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update({ paidAmount: paidAmount }, projectId);
        });
    }
    changeProjectStatus(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update({ status: Project_1.ProjectStatus.FINISHED }, projectId);
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Project_1.Project]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "createProject", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "getProjetNameAndId", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "getProjectAmount", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "getTotalProjectPaidAmount", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "createProjectPayment", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "getProjects", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "updateProject", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "affectAmountToProject", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "updatePaidAmountField", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeormProjectRepo.prototype, "changeProjectStatus", null);
exports.TypeormProjectRepo = TypeormProjectRepo;
exports.ProjectRepo = new TypeormProjectRepo();
//# sourceMappingURL=TypeormProjectRepo.js.map