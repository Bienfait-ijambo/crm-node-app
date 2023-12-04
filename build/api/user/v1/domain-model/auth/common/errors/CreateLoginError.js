"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLoginError = void 0;
class CreateLoginError extends Error {
    constructor(message) {
        super(message = 'Mot de passe ou adresse mail invalide !');
        this.name = "InvalidUserInput";
    }
}
exports.CreateLoginError = CreateLoginError;
//# sourceMappingURL=CreateLoginError.js.map