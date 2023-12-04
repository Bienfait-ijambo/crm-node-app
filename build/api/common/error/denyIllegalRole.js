"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denyIllegalRole = void 0;
// import { roles } from "../../../infrastructure/typeorm/seeder/role";
const requiredProperty_1 = require("./requiredProperty");
/**
 *
 * @param param role
 */
const denyIllegalRole = (param) => {
    if (typeof param !== "string")
        throw new Error("Role must be a string");
    (0, requiredProperty_1.requiredPropertyError)(param, "role");
    // roles.forEach((role) => {
    //   if (role.name !== param) {
    //     throw new Error(`Invalid role !}`);
    //   }
    // });
};
exports.denyIllegalRole = denyIllegalRole;
//# sourceMappingURL=denyIllegalRole.js.map