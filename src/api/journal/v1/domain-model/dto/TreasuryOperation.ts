import { ITreasuryDto } from "./ITreasuryDto";
import { IJournalDto } from "./IjournalDto";





export class TreasuryOperation{

    constructor(private arr: IJournalDto[]){
        this.arr = arr;
    }

    public getTreasuryInput():ITreasuryDto[]{

        const treasuryInput:ITreasuryDto[] = [];

        for(let i=0; i<this.arr.length; i++) {
            treasuryInput.push({
                accountId: this.arr[i].accountId,
                totalAmount: this.arr[i].amount,
                userId: this.arr[i].userId,
                transactionType: this.arr[i].transactionType
            })
        }
        return treasuryInput
    }


    private aggregateAccountAmount(){

    }
}