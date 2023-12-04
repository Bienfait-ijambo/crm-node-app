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
exports.GetUserUseCase = void 0;
const propertyIsValidNumber_1 = require("../../../../common/error/propertyIsValidNumber");
/**
 * get a sigle user
 */
class GetUserUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, propertyIsValidNumber_1.propertyIsValidNumber)(id, "Id");
            const user = yield this.repo.getUser(id);
            return user;
        });
    }
}
exports.GetUserUseCase = GetUserUseCase;
//# sourceMappingURL=GetUser.js.map