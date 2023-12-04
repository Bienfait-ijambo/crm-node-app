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
exports.typeQueries = void 0;
const TypeormTypeRepo_1 = require("../../repository/TypeormTypeRepo");
const GetBilan_1 = require("../../domain-model/usecases/GetBilan");
const CreateAccountResult_1 = require("../../domain-model/usecases/CreateAccountResult");
const getAccountTypesWithMasses_1 = require("../../domain-model/usecases/getAccountTypesWithMasses");
exports.typeQueries = {
    types: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        return [];
        // const usecase = new GetTypeUseCase(TypeRepo);
        // const result= await usecase.execute();
        // return result
    }),
    accountTypes: (root, args, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const useCase = new getAccountTypesWithMasses_1.GetAccountTypesWithMass(TypeormTypeRepo_1.TypeRepo);
        const result = yield useCase.execute();
        return result;
        // return existingAccountTypes
    }),
    bilan: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetBilan_1.GetBilanUseCase(TypeormTypeRepo_1.TypeRepo);
        const { masses, count, totalPages } = yield usecase.execute(input);
        return { masses, count, totalPages };
    }),
    getAccountResult: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateAccountResult_1.CreateAccountResultUseCase(TypeormTypeRepo_1.TypeRepo);
        const { masses, count, totalPages } = yield usecase.execute(input);
        return { masses, count, totalPages };
    }),
};
//# sourceMappingURL=type.query.js.map