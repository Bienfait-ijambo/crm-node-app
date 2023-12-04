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
exports.MassMutations = void 0;
const TypeormMassRepo_1 = require("../repository/TypeormMassRepo");
const CreateMass_1 = require("../domain-model/usecases/CreateMass");
const UpdateMass_1 = require("../domain-model/usecases/UpdateMass");
exports.MassMutations = {
    createMass: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateMass_1.CreateMassUseCase(TypeormMassRepo_1.MassRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
    updateMass: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        // verifyToken(token)
        const usecase = new UpdateMass_1.UpdateMassUseCase(TypeormMassRepo_1.MassRepo);
        return yield usecase.execute(input);
    }),
};
//# sourceMappingURL=mass.mutation.js.map