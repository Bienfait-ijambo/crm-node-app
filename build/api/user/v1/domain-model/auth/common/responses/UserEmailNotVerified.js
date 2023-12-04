"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailNotVerified = void 0;
const ClientResponse_1 = require("../../../../../../../shared/response/ClientResponse");
function UserEmailNotVerified() {
    const res = new ClientResponse_1.CreateClientResponse('Veuillez vérifier votre adrese mail !', 422, false, true);
    return {
        response: res,
        isValidEmail: false
    };
}
exports.UserEmailNotVerified = UserEmailNotVerified;
//# sourceMappingURL=UserEmailNotVerified.js.map