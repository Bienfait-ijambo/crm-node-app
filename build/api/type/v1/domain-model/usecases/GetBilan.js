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
exports.GetBilanUseCase = void 0;
const validationError_1 = require("../../../../../shared/errors/validationError");
class GetBilanUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.startDate == '' || input.endDate == '')
                throw new validationError_1.ValidationError('Veuiller entrer la date debut et Fin');
            const result = yield this.repo.getBilan(input);
            return result;
        });
    }
}
exports.GetBilanUseCase = GetBilanUseCase;
//# sourceMappingURL=GetBilan.js.map