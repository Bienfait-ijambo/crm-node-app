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
exports.ServiceMutations = void 0;
const CreateService_1 = require("../domain-model/usecases/CreateService");
const UpdateService_1 = require("../domain-model/usecases/UpdateService");
const TypeormServiceRepo_1 = require("../repository/TypeormServiceRepo");
class ServiceMutations {
    createService(root, { input }, { token }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verifyToken(token)
            const usecase = new CreateService_1.CreateServiceUseCase(TypeormServiceRepo_1.serviceRepo);
            return yield usecase.execute(input);
        });
    }
    updateService(root, { input }, { token }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verifyToken(token)
            const usecase = new UpdateService_1.UpdateServeUseCase(TypeormServiceRepo_1.serviceRepo);
            return yield usecase.execute(input);
        });
    }
}
exports.ServiceMutations = ServiceMutations;
//# sourceMappingURL=service.mutation.js.map