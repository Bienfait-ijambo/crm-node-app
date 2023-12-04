"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserBlockedError = void 0;
class CreateUserBlockedError extends Error {
    constructor(message) {
        super(message = 'Votre compte a été bloqué, Veuillez contacter UBS !');
        this.name = "InvalidUserInput";
    }
}
exports.CreateUserBlockedError = CreateUserBlockedError;
//# sourceMappingURL=CreateUserBlockedError.js.map