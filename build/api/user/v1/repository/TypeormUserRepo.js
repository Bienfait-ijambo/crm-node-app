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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.userRepo = exports.TypeormUserRepo = void 0;
const data_source_1 = require("../../../../infrastructure/typeorm/data-source");
const UserNotFound_1 = require("../../../../shared/errors/UserNotFound");
const User_1 = require("../../../../entities/User");
const CachError_1 = require("../../../../shared/exceptions/CachError");
const DB_1 = require("../../../common/db/DB");
const UserMapper_1 = require("./UserMapper");
const EnterpriseInfo_1 = require("../../../../entities/EnterpriseInfo");
const Role_1 = require("../domain-model/domain/Role");
class TypeormUserRepo {
    constructor() {
        this.db = new DB_1.DB(User_1.User);
    }
    getUserPermissions() {
        throw new Error("Method not implemented.");
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.save(user);
            return result;
        });
    }
    createEnterpriseInfo(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const infoExist = yield this.getUserEnterpiseInfo(input.userId);
            if (infoExist.email == '') {
                const saveResult = yield this.saveEnterpiseInfo(input);
                return saveResult ? true : false;
            }
            else {
                const updateResult = yield this.updateEnterPriseInfo(input);
                return updateResult ? true : false;
            }
        });
    }
    getUserEnterpiseInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(EnterpriseInfo_1.EnterpriseInfo)
                .createQueryBuilder('enterprise_info')
                .where(`enterprise_info.userId = :userId`, { userId: userId })
                .getOne();
            return result ? result : UserMapper_1.UserMapper.enterpriseInfoReturnTypeIfNull(userId);
        });
    }
    saveEnterpiseInfo(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(EnterpriseInfo_1.EnterpriseInfo).save(input);
            if (result)
                return true;
        });
    }
    updateEnterPriseInfo(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = input, restInput = __rest(input, ["userId"]);
            const update = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(EnterpriseInfo_1.EnterpriseInfo)
                .set(restInput)
                .where("userId = :userId", { userId: input.userId })
                .execute();
            return update.affected === 0 ? false : true;
        });
    }
    findUserByCode(userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(User_1.User)
                .createQueryBuilder('user')
                .where(`user.userCode = :userCode`, { userCode: userCode })
                .getOne();
            return result;
        });
    }
    findUserByIdAndCode(userId, userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.getRepository(User_1.User)
                .createQueryBuilder('user')
                .where(`user.id = :id`, { id: userId })
                .andWhere(`user.userCode = :userCode`, { userCode: userCode })
                .getOne();
            return result;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.getOneByColumnName("user", "email", {
                email: email,
            });
            if (user)
                return user;
        });
    }
    findUserByProviderId(userProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.getOneByColumnName("user", "userProviderId", {
                userProviderId: userProviderId,
            });
            if (user)
                return user;
        });
    }
    findUserByTelephone(telephone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.getOneByColumnName("user", "telephone", {
                telephone: telephone,
            });
            if (user)
                return user;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.getOne(id, "user");
            if (user == null)
                throw new UserNotFound_1.UserNotFound();
            return user;
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserById(id);
            return UserMapper_1.UserMapper.toDto(user);
        });
    }
    updatePassword(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.update({ password: input.newPassword }, input.id);
            return result ? true : false;
        });
    }
    IsValidOptNumber(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByEmail(input.email);
            if (user == null)
                throw new Error("Veuillez entre une adresse mail valide !");
            if (user.otpNumber == input.otpNumber) {
                yield this.db.update({ emailIsVerified: true }, user.id);
                return true;
            }
            return false;
        });
    }
    getUsers(input, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            const [user, count] = yield data_source_1.AppDataSource.getRepository(User_1.User)
                .createQueryBuilder("user")
                .select(["user.id", "user.userName", "user.email", "user.telephone", "user.role", "user.userCode", "user.image", 'user.userpermissions', "user.userIsBlocked"])
                .where("lower(user.userName) LIKE :name", { name: `%${input.userName.toLowerCase()}%` })
                .andWhere('user.userCode=:usercode', { usercode: input.userCode })
                .skip((page - 1) * PAGE_SIZE)
                .take(PAGE_SIZE)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            const users = UserMapper_1.UserMapper.convertUserPermissionToJson(user);
            return { users, count, totalPages };
        });
    }
    getSubscriberUserByCode(userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 10;
            const [users, count] = yield data_source_1.AppDataSource.getRepository(User_1.User)
                .createQueryBuilder("user")
                .select(["user.id", "user.userName", "user.email", "user.image", "user.userCode", "user.userIsBlocked"])
                .where('user.userCode=:usercode', { usercode: userCode })
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { users, count, totalPages };
        });
    }
    /**
     *
     *
     */
    getSubscribers() {
        return __awaiter(this, void 0, void 0, function* () {
            /****
             *
             * TO IMPROVE IN CASE WE HAVE MORE THAN FITH_TEEN USERS
             *
             */
            const PAGE_SIZE = 15;
            const [users, count] = yield data_source_1.AppDataSource.getRepository(User_1.User)
                .createQueryBuilder("user")
                .select(["user.id", "user.userName", "user.email", "user.telephone", "user.role", "user.userCode", "user.image", "user.userIsBlocked"])
                // .where("lower(user.userName) LIKE :name", { name: `%${input.userName.toLowerCase()}%`})
                .where('user.role=:userRole', { userRole: Role_1.userRole.OWNER })
                // .skip((page - 1) * PAGE_SIZE)
                // .take(PAGE_SIZE)
                .limit(20)
                .getManyAndCount();
            const totalPages = Math.ceil(count / PAGE_SIZE);
            return { users, count, totalPages };
        });
    }
    updateUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = input, restInput = __rest(input, ["email"]);
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(User_1.User)
                .set(restInput)
                .where("email = :email", { email: email })
                .execute();
            return result.affected === 0 ? false : true;
        });
    }
    attribUserPermission(userId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(User_1.User)
                .set({ userpermissions: input })
                .where("id = :id", { id: userId })
                .execute();
            return result.affected === 0 ? false : true;
        });
    }
    blockUser(userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(User_1.User)
                .set({ userIsBlocked: true })
                .where("userCode = :userCode", { userCode: userCode })
                .execute();
            return result ? true : false;
        });
    }
    unBlockUser(userCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(User_1.User)
                .set({ userIsBlocked: false })
                .where("userCode = :userCode", { userCode: userCode })
                .execute();
            return result ? true : false;
        });
    }
    updateUserProviderId(userId, userProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(User_1.User)
                .set({ userProviderId: userProviderId })
                .where("id = :id", { id: userId })
                .execute();
            return result.affected === 0 ? false : true;
        });
    }
    uploadImage(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(User_1.User)
                .set({ image: input.image })
                .where("email = :email", { email: input.email })
                .execute();
            return result.affected === 0 ? false : true;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .delete()
                .from(User_1.User)
                .where("id = :id", { id: userId })
                .execute();
            return result ? true : false;
        });
    }
    uploadEnterpriseLogo(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .update(EnterpriseInfo_1.EnterpriseInfo)
                .set({ image: input.image })
                .where("userId = :userId", { userId: input.userId })
                .execute();
            return result ? true : false;
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "createUser", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "createEnterpriseInfo", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "getUserEnterpiseInfo", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "saveEnterpiseInfo", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "updateEnterPriseInfo", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "findUserByCode", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "findUserByIdAndCode", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "findUserByEmail", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "findUserByProviderId", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "findUserByTelephone", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "findUserById", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "getUser", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "updatePassword", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "IsValidOptNumber", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "getUsers", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "getSubscriberUserByCode", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "getSubscribers", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "updateUser", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "attribUserPermission", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "blockUser", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "unBlockUser", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "updateUserProviderId", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "uploadImage", null);
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeormUserRepo.prototype, "uploadEnterpriseLogo", null);
exports.TypeormUserRepo = TypeormUserRepo;
exports.userRepo = new TypeormUserRepo();
//# sourceMappingURL=TypeormUserRepo.js.map