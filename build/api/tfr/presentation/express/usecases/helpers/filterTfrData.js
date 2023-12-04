"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTfrData = void 0;
function filterTfrData(array, resultType) {
    const filteredData = array.filter((item) => item.resultType === resultType);
    return filteredData;
}
exports.filterTfrData = filterTfrData;
//# sourceMappingURL=filterTfrData.js.map