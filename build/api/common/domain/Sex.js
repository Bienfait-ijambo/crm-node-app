"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sex = exports.sexEnum = void 0;
var sexEnum;
(function (sexEnum) {
    sexEnum[sexEnum["MALE"] = 1] = "MALE";
    sexEnum[sexEnum["FEMALE"] = 2] = "FEMALE";
})(sexEnum = exports.sexEnum || (exports.sexEnum = {}));
class Sex {
    constructor(sex) {
        this.sex = sex;
        if (!this.isValidSex()) {
            throw new Error(`Sex invalid Homme : ${sexEnum.MALE}, & FEMME ${sexEnum.FEMALE}`);
        }
    }
    isValidSex() {
        if (this.sex !== sexEnum.MALE && this.sex !== sexEnum.FEMALE)
            return false;
        return true;
    }
    getSex() {
        return this.sex;
    }
}
exports.Sex = Sex;
//# sourceMappingURL=Sex.js.map