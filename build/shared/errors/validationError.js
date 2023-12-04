"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        Object.defineProperty(this, 'name', { value: 'ValidationError' });
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validationError.js.map