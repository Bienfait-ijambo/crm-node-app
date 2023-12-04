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
exports.CreateGrossMarginUseCase = void 0;
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const createGrossMarginDto_1 = require("../dto/createGrossMarginDto");
class CreateGrossMarginUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = new createGrossMarginDto_1.CreateGrossMarginDto(input);
            const result = yield data_source_1.AppDataSource.transaction(() => __awaiter(this, void 0, void 0, function* () {
                const [result1] = yield Promise.all([
                    this.repo.createTFr(dto.getGrossMarginInput()),
                    this.repo.createTfrResulatAccount(dto.getTfrResultAccountInput()),
                ]);
                return result1;
            }));
            return result;
        });
    }
}
exports.CreateGrossMarginUseCase = CreateGrossMarginUseCase;
//# sourceMappingURL=CreateGrossMargin.js.map