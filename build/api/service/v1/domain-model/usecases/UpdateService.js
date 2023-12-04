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
exports.UpdateServeUseCase = void 0;
const UpdateServiceDto_1 = require("../dto/UpdateServiceDto");
class UpdateServeUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new UpdateServiceDto_1.UpdateServiceDto(input);
            const result = yield this.repo.updateService(service.getUpdateInput());
            return result;
        });
    }
}
exports.UpdateServeUseCase = UpdateServeUseCase;
//# sourceMappingURL=UpdateService.js.map