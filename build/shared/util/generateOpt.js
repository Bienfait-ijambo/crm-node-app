"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = void 0;
/**
 *
 * @param length
 * @returns generated random string
 */
function generateRandomNumber(length) {
    let result = "";
    const characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.generateRandomNumber = generateRandomNumber;
//# sourceMappingURL=generateOpt.js.map