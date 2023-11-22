
import { enumAccountType } from "../../../../entities/AccountType";
import { enumMassType } from "../../../../entities/Mass";
import { IJournalDto } from "../../../journal/v1/domain-model/dto/IjournalDto";
import { returnTypeAggregateAccount } from "../../repository/IAggregateAccountRepo";
import { AggregateAccountDto } from "./AggregateAccountDto";
import { ProcessBilanTypes } from "./ProcessBilanTypes";

export class CreateAggregateAccountDto {


    public getAccountIds(input: IJournalDto[]): number[] {
        const accountIds: number[] = [];

        for (let i = 0; i < input.length; i++) {
            accountIds.push(parseInt(input[i].accountId.toString()));
        }
        return accountIds;
    }

    public getInsertInput(input: IJournalDto[]): AggregateAccountDto[] {
        const newarr: AggregateAccountDto[] = [];


        for (let i = 0; i < input.length; i++) {

            if(input[i].accountType===enumAccountType.ACTIF && input[i].massId===enumMassType.TRESORERIE_ACTIF){
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
    private getAggregateAccountIds(
        aggregateInput: returnTypeAggregateAccount[]
    ): number[] {
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
    private filterAccountToUpdate(journalInput: IJournalDto[], aggregateInput: returnTypeAggregateAccount[]): IJournalDto[] {
        //accountIds
        const accountIds = this.getAggregateAccountIds(aggregateInput);
        //account
        const accountToUpdate: IJournalDto[] = [];

        for (let i = 0; i < accountIds.length; i++) {
            const obj = journalInput.filter(
                (item) => item.accountId == accountIds[i]
            );

            accountToUpdate.push(obj[0]);
        }
        return accountToUpdate;
    }



    private covertAmountToNumber(aggregateInput: returnTypeAggregateAccount[]) {
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


    

    public getAggregateUpdateInput(journalInput: IJournalDto[], aggregateInput: returnTypeAggregateAccount[]) {
        const arr: IJournalDto[] = this.filterAccountToUpdate(journalInput, aggregateInput);
        let returnAggregateInput = this.covertAmountToNumber(aggregateInput);
        const error:any[] = []
        let serviceStatus:number=0
        const bilan = new ProcessBilanTypes()

        for (let i = 0; i < arr.length; i++) {

            bilan.processActifAccount({arr,i,aggregateInput,returnAggregateInput,error})
        }


        return {returnAggregateInput, error,serviceStatus};
    }







  
}
