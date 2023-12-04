"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = void 0;
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}
exports.isValidDate = isValidDate;
//# sourceMappingURL=isValidDate.js.map