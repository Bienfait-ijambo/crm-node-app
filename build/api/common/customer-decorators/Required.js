"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeFieldNameToFrench = exports.Required = void 0;
const requiredProperty_1 = require("../error/requiredProperty");
/**
 *
 * @param min
 * @param max
 * @returns
 */
function Required(min, max) {
    return function (target, propertyKey) {
        let value = target[propertyKey];
        const getter = function () {
            return value;
        };
        const setter = function (newValue) {
            (0, requiredProperty_1.requiredPropertyError)(newValue, `${propertyKey}`);
            if (newValue.length >= min && newValue.length <= max) {
            }
            else {
                throw new Error(`${changeFieldNameToFrench(propertyKey)}  doit être entre  ${min} et ${max} charactères !!`);
            }
            value = newValue;
        };
        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter,
            enumerable: true,
            configurable: true,
        });
    };
}
exports.Required = Required;
function changeFieldNameToFrench(propery) {
    switch (propery) {
        case "name":
            return "Nom";
        case "designation":
            return "Designation";
        default:
            return propery;
    }
}
exports.changeFieldNameToFrench = changeFieldNameToFrench;
//# sourceMappingURL=Required.js.map