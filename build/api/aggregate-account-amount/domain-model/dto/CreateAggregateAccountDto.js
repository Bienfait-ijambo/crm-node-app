"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAggregateAccountDto = void 0;
const AccountType_1 = require("../../../../entities/AccountType");
const Mass_1 = require("../../../../entities/Mass");
const ProcessBilanTypes_1 = require("./ProcessBilanTypes");
class CreateAggregateAccountDto {
    getAccountIds(input) {
        const accountIds = [];
        for (let i = 0; i < input.length; i++) {
            accountIds.push(parseInt(input[i].accountId.toString()));
        }
        return accountIds;
    }
    getInsertInput(input) {
        const newarr = [];
        for (let i = 0; i < input.length; i++) {
            if (input[i].accountType === AccountType_1.enumAccountType.ACTIF && input[i].massId === Mass_1.enumMassType.TRESORERIE_ACTIF) {
                newarr.push({
                    accountId: input[i].accountId,
                    accountType: input[i].accountType,
                    totalAmount: input[i].amount,
                    userId: input[i].userId,
                });
            }
        }
        return newarr;
    }
    /**
     *
     * @param aggregateInput
     * returns accountId from the aggregateAccountAmount table
     */
    getAggregateAccountIds(aggregateInput) {
        const ids = [];
        for (let i = 0; i < aggregateInput.length; i++) {
            ids.push(aggregateInput[i].accountId);
        }
        return ids;
    }
    /**
     *
     * @param journalInput
     * @param aggregateInput
     *  Get data from aggregateAccountAmount-table then filter account to update
     * from journalInput which exist in aggregateAccountAmount-table
     */
    filterAccountToUpdate(journalInput, aggregateInput) {
        //accountIds
        const accountIds = this.getAggregateAccountIds(aggregateInput);
        //account
        const accountToUpdate = [];
        for (let i = 0; i < accountIds.length; i++) {
            const obj = journalInput.filter((item) => item.accountId == accountIds[i]);
            accountToUpdate.push(obj[0]);
        }
        return accountToUpdate;
    }
    covertAmountToNumber(aggregateInput) {
        const newArr = aggregateInput.map((item) => {
            parseFloat(item.totalAmount);
            return {
                id: item.id,
                accountId: item.accountId,
                totalAmount: parseFloat(item.totalAmount),
                userId: item.userId,
            };
        });
        return newArr;
    }
    getAggregateUpdateInput(journalInput, aggregateInput) {
        const arr = this.filterAccountToUpdate(journalInput, aggregateInput);
        let returnAggregateInput = this.covertAmountToNumber(aggregateInput);
        const error = [];
        let serviceStatus = 0;
        const bilan = new ProcessBilanTypes_1.ProcessBilanTypes();
        for (let i = 0; i < arr.length; i++) {
            bilan.processActifAccount({ arr, i, aggregateInput, returnAggregateInput, error });
        }
        return { returnAggregateInput, error, serviceStatus };
    }
}
exports.CreateAggregateAccountDto = CreateAggregateAccountDto;
//# sourceMappingURL=CreateAggregateAccountDto.js.map