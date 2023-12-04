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
exports.CreateTypeUseCase = void 0;
const TypeDomain_1 = require("../dto/TypeDomain");
class CreateTypeUseCase {
    constructor(repo) {
        this.repo = repo;
        this.repo = repo;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = TypeDomain_1.TypeDomain.createTypeInput(input);
            const doesTypeExist = yield this.repo.getTypeByName(input.name);
            if (doesTypeExist == false) {
                const result = yield this.repo.createType(type);
                this.repo.createAccounTypeMass(result.id, input.massId);
                return input;
            }
            const typeId = doesTypeExist === null || doesTypeExist === void 0 ? void 0 : doesTypeExist.id;
            const accountTypeHasMass = yield this.repo.accountTypeHasMass(typeId, input.massId);
            if (accountTypeHasMass)
                throw new Error("Vous avez déjà attribuer ce type à cette masse !");
            this.repo.createAccounTypeMass(typeId, input.massId);
            return input;
        });
    }
}
exports.CreateTypeUseCase = CreateTypeUseCase;
//# sourceMappingURL=CreateType.js.map