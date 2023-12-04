"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredPropertyError = void 0;
class createError {
    constructor(message) {
        this.message = message;
    }
}
class PropertyError extends createError {
    constructor(property, message) {
        super(message);
        this.property = property;
    }
}
/**
 *
 * @param property
 * @param name
 * @throws an error if the property is not undefined or not empty
 */
const requiredPropertyError = (property, name) => {
    if (typeof property === 'undefined' || property === '')
        throw new Error(`Veuillez entre la ${property}  `);
};
exports.requiredPropertyError = requiredPropertyError;
//# sourceMappingURL=requiredProperty.js.map