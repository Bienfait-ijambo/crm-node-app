"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserCode = void 0;
/**
 * generate unique code using email+timestamp+randomNumber
 * @param email
 * @returns code
 *
 */
function generateUserCode(email) {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000);
    const userCode = email + timestamp + randomNumber;
    return userCode;
}
exports.generateUserCode = generateUserCode;
//# sourceMappingURL=generateUserCode.js.map