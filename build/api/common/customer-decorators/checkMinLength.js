"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMinLength = void 0;
const requiredProperty_1 = require("../error/requiredProperty");
/**
 *
 * @param minLength
 * Checks if a str is less  or equal to {minLength} else @throws an  error
 */
function checkMinLength(minLength) {
    return function (target, propertyKey) {
        let value = target[propertyKey];
        const getter = function () {
            return value;
        };
        const setter = function (newValue) {
            //check string length
            (0, requiredProperty_1.requiredPropertyError)(newValue, `${propertyKey}`);
            if (newValue.length >= minLength) {
                value = newValue;
            }
            else {
                throw new Error(`${propertyKey}  must be less than ${minLength} characters`);
            }
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
exports.checkMinLength = checkMinLength;
//# sourceMappingURL=checkMinLength.js.map