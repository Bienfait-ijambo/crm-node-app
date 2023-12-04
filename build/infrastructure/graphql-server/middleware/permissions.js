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
const graphql_shield_1 = require("graphql-shield");
const Jwt_1 = require("../../../middleware/Jwt");
const isAuthenticated = (0, graphql_shield_1.rule)({ cache: "contextual" })((parent, args, { token }, info) => __awaiter(void 0, void 0, void 0, function* () {
    yield Jwt_1.JwtToken.verifyGraphqlToken(token);
    return token !== null;
}));
exports.default = (0, graphql_shield_1.shield)({
    Query: {
        "*": isAuthenticated,
    },
    Mutation: {
        "*": isAuthenticated,
        registerMainUser: graphql_shield_1.allow,
        verifyOptNumber: graphql_shield_1.allow,
        loginUser: graphql_shield_1.allow,
        loginUserViaOAuth: graphql_shield_1.allow
    },
}, { allowExternalErrors: true });
//# sourceMappingURL=permissions.js.map