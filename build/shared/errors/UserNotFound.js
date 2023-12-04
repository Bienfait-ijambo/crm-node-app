"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFound = void 0;
class UserNotFound extends Error {
    constructor(message) {
        super(message || 'NotFoundError');
        this.name = 'NotFoundError';
    }
}
exports.UserNotFound = UserNotFound;
//# sourceMappingURL=UserNotFound.js.map