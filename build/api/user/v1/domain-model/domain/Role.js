"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.Roles = exports.userRole = void 0;
const Required_1 = require("../../../../common/customer-decorators/Required");
var userRole;
(function (userRole) {
    userRole["OWNER"] = "OWNER";
    userRole["ADMIN"] = "ADMIN";
    userRole["ACCOUNTANT"] = "COMPTABLE";
    userRole["CASHIER"] = "CAISSIER";
    userRole["SUPERUSER"] = "SUPER_UBS_USER_76375077";
})(userRole = exports.userRole || (exports.userRole = {}));
class Roles {
    constructor() {
        /**
         * @param {string}
         * returns all roles except [SUPERADMIN,OWNER]
         */
        this.roles = [userRole.ADMIN, userRole.ACCOUNTANT, userRole.CASHIER, userRole.OWNER, userRole.SUPERUSER];
    }
    getRoles() {
        const roles = [];
        for (let i = 0; i < this.roles.length; ++i) {
            roles.push({
                name: this.roles[i]
            });
        }
        return roles;
    }
}
exports.Roles = Roles;
class Role extends Roles {
    constructor(role) {
        super();
        this.role = role;
        if (!this.isInvalidRole()) {
            throw new Error("Provided role is invalid !");
        }
    }
    isInvalidRole() {
        const isValidRole = this.roles.includes(this.roleToUpperCase());
        return isValidRole;
    }
    getRole() {
        return this.roleToUpperCase();
    }
    roleToUpperCase() {
        return this.role.toLocaleUpperCase();
    }
}
__decorate([
    (0, Required_1.Required)(4, 10),
    __metadata("design:type", String)
], Role.prototype, "role", void 0);
exports.Role = Role;
//# sourceMappingURL=Role.js.map