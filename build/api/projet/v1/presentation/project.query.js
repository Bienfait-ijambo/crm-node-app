"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectQueries = void 0;
const TypeormProjectRepo_1 = require("../repository/TypeormProjectRepo");
const GetProject_1 = require("../domain-model/usecases/GetProject");
const GetProjectIdAndName_1 = require("../domain-model/usecases/GetProjectIdAndName");
const GetProjectAmount_1 = require("../domain-model/usecases/GetProjectAmount");
exports.projectQueries = {
    projects: (root, { name, userId, page }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetProject_1.GetProjectUserCase(TypeormProjectRepo_1.ProjectRepo);
        const { projects, count, totalPages } = yield usecase.execute(name, userId, page);
        return { projects, count, totalPages };
    }),
    projectIdAndName: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetProjectIdAndName_1.GetProjectIdAndNameUseCase(TypeormProjectRepo_1.ProjectRepo);
        const { projects } = yield usecase.execute(input);
        return projects;
    }),
    getProjectAmount: (root, { userId, projectId }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetProjectAmount_1.GetProjectAmountUseCase(TypeormProjectRepo_1.ProjectRepo);
        const result = yield usecase.execute(projectId, userId);
        return result != null ? result : { amount: 0, paidAmount: 0 };
    }),
};
//# sourceMappingURL=project.query.js.map