"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGraphqlError = void 0;
const handleGraphqlError = (error) => {
    return {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
    };
};
exports.handleGraphqlError = handleGraphqlError;
//# sourceMappingURL=handleGraphqlError.js.map