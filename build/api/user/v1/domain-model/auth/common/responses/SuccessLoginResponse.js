"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successLoginResponse = void 0;
const ClientResponse_1 = require("../../../../../../../shared/response/ClientResponse");
function successLoginResponse() {
    const res = new ClientResponse_1.CreateClientResponse(`Your welcome !`, 200, true, true);
    return res;
}
exports.successLoginResponse = successLoginResponse;
//# sourceMappingURL=SuccessLoginResponse.js.map