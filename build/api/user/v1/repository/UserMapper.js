"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const EnterpriseInfo_1 = require("../../../../entities/EnterpriseInfo");
class UserMapper {
    static toDto(user) {
        return {
            id: +user.id,
            userName: user.userName,
            email: user.email,
            image: user === null || user === void 0 ? void 0 : user.image,
            telephone: user.telephone,
            isValidPhoneNumber: user.isValidPhoneNumber,
            role: user.role,
            userCode: user.userCode,
            otpNumber: user.otpNumber
        };
    }
    static fromEntity(userEntity) {
        return userEntity.map((user) => this.toDto(user));
    }
    static userPermissionInput(input) {
        const newArr = [];
        for (let i = 0; i < input.length; i++) {
            newArr.push({
                id: input[i].id,
                pageName: input[i].pageName,
                actions: input[i].actions
            });
        }
        return newArr;
    }
    /**
     *
     * @param userId
     * @returns empty enterprise info for a user
     */
    static enterpriseInfoReturnTypeIfNull(userId) {
        return new EnterpriseInfo_1.EnterpriseInfo(userId, '', '', '', '', '', '');
    }
    static convertUserPermissionToJson(userArray) {
        const users = userArray.map(user => {
            const { userpermissions } = user, restOb = __rest(user, ["userpermissions"]);
            return Object.assign(Object.assign({}, restOb), { userpermissions: Array.isArray(userpermissions) ? userpermissions : [] });
        });
        return users;
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map