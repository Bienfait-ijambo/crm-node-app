"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRequiredProperty = void 0;
/**
 *
 * @param obj
 * @param provideProperty
 * chekcs if property is required otherwise
 * @throws {Error} if a user provide unrequested property
 */
const checkRequiredProperty = (obj, requiredProps) => {
    Object.keys(obj).forEach(key => {
        if (!requiredProps.includes(key)) {
            throw new Error(`${key} is not a required property`);
        }
    });
};
exports.checkRequiredProperty = checkRequiredProperty;
//# sourceMappingURL=checkRequiredProperty.js.map