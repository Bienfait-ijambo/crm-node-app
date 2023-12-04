"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTelephoneNumberIsInvalid = void 0;
const ClientResponse_1 = require("../../../../../../../shared/response/ClientResponse");
function UserTelephoneNumberIsInvalid() {
    const res = new ClientResponse_1.CreateClientResponse('User telephone number not verified', 422, false, false);
    return {
        response: res
    };
}
exports.UserTelephoneNumberIsInvalid = UserTelephoneNumberIsInvalid;
//# sourceMappingURL=UserTelephoneNumber.js.map