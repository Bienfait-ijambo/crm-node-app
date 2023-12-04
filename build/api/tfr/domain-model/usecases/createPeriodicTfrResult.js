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
exports.CreatePeriodicTfrResult = void 0;
const createTfrPeriodResultDto_1 = require("../dto/createTfrPeriodResultDto");
class CreatePeriodicTfrResult {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = new createTfrPeriodResultDto_1.CreateTfrPeriodResultDto(input);
                yield dto.validate();
                const result = yield this.repo.createPeriodicTfrResult(dto.getInput());
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.CreatePeriodicTfrResult = CreatePeriodicTfrResult;
//# sourceMappingURL=createPeriodicTfrResult.js.map