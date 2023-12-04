"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidLoginInputType = void 0;
const userInterfaces_1 = require("../../usecases/interfaces/userInterfaces");
function IsValidLoginInputType(target, key) {
    let value = target[key];
    const getter = () => value;
    const setter = (newValue) => {
        value = newValue;
        const inputType = newValue.toUpperCase();
        if (inputType !== userInterfaces_1.LoginByInputType.TELEPHONE && inputType !== userInterfaces_1.LoginByInputType.EMAIL)
            throw new Error(`Invalid login input type: ${inputType}`);
    };
    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}
exports.IsValidLoginInputType = IsValidLoginInputType;
//# sourceMappingURL=IsValidLoginInputType.js.map