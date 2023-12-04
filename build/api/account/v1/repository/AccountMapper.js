"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMapper = void 0;
class AccountMapper {
    static toDto(account) {
        return {
            id: +account.id,
            name: account.name,
            code: account.code,
            typeId: account.accountTypeId,
            massId: account.massId,
        };
    }
}
exports.AccountMapper = AccountMapper;
//# sourceMappingURL=AccountMapper.js.map