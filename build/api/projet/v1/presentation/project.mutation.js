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
exports.projectMutations = void 0;
const TypeormProjectRepo_1 = require("../repository/TypeormProjectRepo");
const CreateProject_1 = require("../domain-model/usecases/CreateProject");
const UpdateProject_1 = require("../domain-model/usecases/UpdateProject");
const AffectAmount_1 = require("../domain-model/usecases/AffectAmount");
exports.projectMutations = {
    createProject: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateProject_1.CreateProjectUseCase(TypeormProjectRepo_1.ProjectRepo);
        return yield usecase.execute(input);
    }),
    updateProject: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new UpdateProject_1.UpdateProjectUseCase(TypeormProjectRepo_1.ProjectRepo);
        return yield usecase.execute(input);
    }),
    affectAmountToProject: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new AffectAmount_1.AffectAmountUseCase(TypeormProjectRepo_1.ProjectRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
};
//# sourceMappingURL=project.mutation.js.map