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
exports.CreateTfrResultUseCase = void 0;
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const createTfrResultDto_1 = require("../dto/createTfrResultDto");
/**
 * create tfResult expect the GrossMargin
 */
class CreateTfrResultUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = new createTfrResultDto_1.CreateTfrResultDto(input);
            yield data_source_1.AppDataSource.transaction(() => __awaiter(this, void 0, void 0, function* () {
                this.repo.createTFr(dto.getValueAddedInput());
            }));
        });
    }
}
exports.CreateTfrResultUseCase = CreateTfrResultUseCase;
//# sourceMappingURL=CreateTfrResult.js.map