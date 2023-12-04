"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denyInvalidDate = void 0;
const denyInvalidDate = (inputDate) => {
    const date = new Date(inputDate);
    if (inputDate.length == 10) {
        return (date.toString() == 'Invalid Date') ? false : true;
    }
    else {
        return false;
    }
};
exports.denyInvalidDate = denyInvalidDate;
//# sourceMappingURL=denyInvalidDate.js.map