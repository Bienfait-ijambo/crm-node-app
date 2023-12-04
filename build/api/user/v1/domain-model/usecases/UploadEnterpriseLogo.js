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
exports.UploadUserEnterpriseLogoUseCase = void 0;
const propertyIsValidNumber_1 = require("../../../../common/error/propertyIsValidNumber");
class UploadUserEnterpriseLogoUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, propertyIsValidNumber_1.propertyIsValidNumber)(input.userId, 'userId');
            const result = this.repo.uploadEnterpriseLogo(input);
            // const removeCache= this.removeDataFromCache(input.userId)
            const [uploadResult] = yield Promise.all([result]);
            return uploadResult;
        });
    }
}
exports.UploadUserEnterpriseLogoUseCase = UploadUserEnterpriseLogoUseCase;
//# sourceMappingURL=UploadEnterpriseLogo.js.map