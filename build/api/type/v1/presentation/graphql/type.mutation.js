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
exports.typeMutations = void 0;
const TypeormTypeRepo_1 = require("../../repository/TypeormTypeRepo");
const CreateType_1 = require("../../domain-model/usecases/CreateType");
const UpdateType_1 = require("../../domain-model/usecases/UpdateType");
exports.typeMutations = {
    createType: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateType_1.CreateTypeUseCase(TypeormTypeRepo_1.TypeRepo);
        const result = yield usecase.execute(input);
        return result;
    }),
    updateType: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new UpdateType_1.UpdateTypeUseCase(TypeormTypeRepo_1.TypeRepo);
        return yield usecase.execute(input);
    }),
};
//# sourceMappingURL=type.mutation.js.map