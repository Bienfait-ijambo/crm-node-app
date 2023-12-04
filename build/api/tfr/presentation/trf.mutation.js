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
exports.TfrMutations = void 0;
const CreateGrossMargin_1 = require("../domain-model/usecases/CreateGrossMargin");
const CreateTfrResult_1 = require("../domain-model/usecases/CreateTfrResult");
const createPeriodicTfrResult_1 = require("../domain-model/usecases/createPeriodicTfrResult");
const TypeormTFRRepo_1 = require("../repository/TypeormTFRRepo");
exports.TfrMutations = {
    createGrossMargin: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateGrossMargin_1.CreateGrossMarginUseCase(TypeormTFRRepo_1.tfrRepo);
        yield usecase.execute(input);
        return { message: "ok" };
    }),
    CreateTfrResult: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new CreateTfrResult_1.CreateTfrResultUseCase(TypeormTFRRepo_1.tfrRepo);
        yield usecase.execute(input);
        return { message: "ok" };
    }),
    createPeriodicTfrResult: (root, { input }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new createPeriodicTfrResult_1.CreatePeriodicTfrResult(TypeormTFRRepo_1.tfrRepo);
        yield usecase.execute(input);
        return { message: "ok" };
    }),
};
//# sourceMappingURL=trf.mutation.js.map