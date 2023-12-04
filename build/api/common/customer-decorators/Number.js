"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
const propertyIsValidNumber_1 = require("../error/propertyIsValidNumber");
function isNumber(target, propertykey) {
    let value = target[propertykey];
    const getter = function () {
        return value;
    };
    const setter = function (newValue) {
        (0, propertyIsValidNumber_1.propertyIsValidNumber)(newValue, `${propertykey}`);
        value = newValue;
    };
    Object.defineProperty(target, propertykey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}
exports.isNumber = isNumber;
//# sourceMappingURL=Number.js.map