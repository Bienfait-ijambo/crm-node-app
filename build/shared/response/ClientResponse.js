"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientResponse = void 0;
class CreateClientResponse {
    constructor(message, status, isValidEmail, success) {
        this.success = false;
        this.isValidEmail = false;
        this.message = message;
        this.status = status;
        this.success = success;
        this.isValidEmail = isValidEmail;
    }
}
exports.CreateClientResponse = CreateClientResponse;
//# sourceMappingURL=ClientResponse.js.map