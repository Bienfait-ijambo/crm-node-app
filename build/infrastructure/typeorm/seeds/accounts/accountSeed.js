"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attribAccountTypeMasses = exports.seedAccountType = exports.seedMass = void 0;
const AccountType_1 = require("../../../../entities/AccountType");
const Mass_1 = require("../../../../entities/Mass");
const data_source_1 = require("../../data-source");
function seedMass() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield data_source_1.AppDataSource.getRepository(Mass_1.Mass).count();
            if (result !== 0) {
                console.log("Already seed---> mass !!");
                return false;
            }
            for (let i = 0; i < Mass_1.MASSES.length; i++) {
                yield data_source_1.AppDataSource.createQueryBuilder()
                    .insert()
                    .into(Mass_1.Mass)
                    .values({
                    name: Mass_1.MASSES[i].name,
                    status: Mass_1.MASSES[i].status,
                })
                    .execute();
            }
        }
        catch (error) {
            console.log("seed-error---> mass", error.message);
        }
    });
}
exports.seedMass = seedMass;
function seedAccountType() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield data_source_1.AppDataSource.getRepository(AccountType_1.AccountType).count();
            if (result === 0) {
                for (let i = 0; i < AccountType_1.ACCOUNT_TYPE_SEED_DATA.length; i++) {
                    yield data_source_1.AppDataSource.createQueryBuilder()
                        .insert()
                        .into(AccountType_1.AccountType)
                        .values({
                        name: AccountType_1.ACCOUNT_TYPE_SEED_DATA[i].name,
                        status: AccountType_1.ACCOUNT_TYPE_SEED_DATA[i].status,
                    })
                        .execute();
                }
            }
            else {
                console.log("already seed--> accountType !!");
            }
        }
        catch (error) {
            console.log("seed-error::==> account_type");
        }
    });
}
exports.seedAccountType = seedAccountType;
function attribAccountTypeMasses() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield data_source_1.AppDataSource.createQueryBuilder()
                .select()
                .from("account_type_masses_mass", "alias")
                .getCount();
            if (result === 0) {
                for (let i = 0; i < AccountType_1.existingAccountTypes.length; i++) {
                    const accountTypeId = AccountType_1.existingAccountTypes[i].id;
                    for (let j = 0; j < AccountType_1.existingAccountTypes[i].masses.length; j++) {
                        yield data_source_1.AppDataSource.createQueryBuilder()
                            .insert()
                            .into("account_type_masses_mass")
                            .values({
                            accountTypeId: accountTypeId,
                            massId: AccountType_1.existingAccountTypes[i].masses[j].id,
                        })
                            .execute();
                    }
                }
            }
            else {
                console.log("already seed ---> account_type_masses_mass !!");
            }
        }
        catch (error) {
            console.log(" error  :-->account_type_masses_mass----> contrait violation");
        }
    });
}
exports.attribAccountTypeMasses = attribAccountTypeMasses;
//# sourceMappingURL=accountSeed.js.map