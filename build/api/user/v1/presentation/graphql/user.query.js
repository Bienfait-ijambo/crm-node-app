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
exports.userQueries = void 0;
const TypeormUserRepo_1 = require("../../repository/TypeormUserRepo");
const GetUser_1 = require("../../domain-model/usecases/GetUser");
const GetUsers_1 = require("../../domain-model/usecases/GetUsers");
const Role_1 = require("../../domain-model/domain/Role");
const GetSubscribers_1 = require("../../domain-model/usecases/GetSubscribers");
exports.userQueries = {
    users: (root, { userName, userCode, page }) => __awaiter(void 0, void 0, void 0, function* () {
        const input = { userName, userCode };
        const usecase = new GetUsers_1.GetUsersUserCase(TypeormUserRepo_1.userRepo);
        const { users, count, totalPages } = yield usecase.execute(input, page);
        return { users, count, totalPages };
    }),
    user: (root, { id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetUser_1.GetUserUseCase(TypeormUserRepo_1.userRepo);
        return yield usecase.execute(id);
    }),
    roles: (root, { id }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const roles = new Role_1.Roles();
        return roles.getRoles();
    }),
    getSubscribers: (root, { userCode }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetSubscribers_1.GetSubscribers(TypeormUserRepo_1.userRepo);
        return usecase.getSubscribers(userCode);
    }),
    getSubscribeUsersByCode: (root, { userCode }, { token }) => __awaiter(void 0, void 0, void 0, function* () {
        const usecase = new GetSubscribers_1.GetSubscribers(TypeormUserRepo_1.userRepo);
        const result = usecase.getSubscribeUsersByCode(userCode);
        return result;
    }),
};
//# sourceMappingURL=user.query.js.map