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
exports.CreateMassUseCase = void 0;
const MassDomain_1 = require("../dto/MassDomain");
class CreateMassUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const Mass = MassDomain_1.MassDomain.createMassInput(input);
            const doesMassExist = yield this.repo.getMassByName(input.name);
            if (doesMassExist)
                throw new Error('Ce masse existe !');
            const result = yield this.repo.createMass(Mass);
            return result;
        });
    }
}
exports.CreateMassUseCase = CreateMassUseCase;
//# sourceMappingURL=CreateMass.js.map