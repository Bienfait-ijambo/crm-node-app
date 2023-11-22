import { JournalTransactionType } from "../../../../../../entities/Journal";
import { enumMassType } from "../../../../../../entities/Mass";
import { truncNumber } from "../../../../../../shared/util/util";



export interface IAccountResult{
    id:number
    massName:string
    totalMassAmount:number
    account:Array<{
      id: number
      accountName: string
      code: string
      totalDebit: string
      totalCredit:string
      valNet:string
    }>
  }

export const totalChargeAndProductAmount={
    totalChargeAmount:0,
    totalProduitAmount:0
}
//  enumAccountType.PRODUIT
export function getChargeAccount(arr: any) {

  const chargeAccount :IAccountResult[]= arr.filter(
    (item: any) =>
      item.id == enumMassType.CHARGES_EXPLOITATION ||
      item.id == enumMassType.CHARGES_FINANCIERE ||
      item.id == enumMassType.CHARGES_EXCEPTIONNELLES
  );

  const result=createAccountResultArray(chargeAccount)

  totalChargeAndProductAmount.totalChargeAmount=result.length > 0 ? result[0].totalMassAmount:0



  return result;
}


export function getProduitAccount(arr: any) {

  const produitAccount = arr.filter(
    (item: any) =>
      item.id == enumMassType.PRODUIT_EXPLOITATION ||
      item.id == enumMassType.PRODUIT_FINANCIERE ||
      item.id == enumMassType.PRODUIT_EXCEPTIONNELLES
  );

  
  const result=createAccountResultArray(produitAccount);
  totalChargeAndProductAmount.totalProduitAmount=result.length > 0 ? result[0].totalMassAmount:0



  return result
}


export function createAccountResultArray(arr: any) :IAccountResult[] {
  const newArr = [];
  // let totalType=0

  for (let i = 0; i < arr.length; i++) {
    const obj = {
      id: arr[i].id,
      massName: arr[i].name,
      totalMassAmount: 0,
      account: [],
    } as any;

    for (let j = 0; j < arr[i].account.length; j++) {


      const totalDebit = arr[i].account[j].journals.reduce(
        (acc: number, currVal: any) =>
          parseInt(currVal.transactionType) === JournalTransactionType.DEBIT
            ? acc + parseFloat(currVal.amount)
            : acc,
        0
      );
      const totalCredit = arr[i].account[j].journals.reduce(
        (acc: number, currVal: any) =>
          parseInt(currVal.transactionType) === JournalTransactionType.CREDIT
            ? acc + parseFloat(currVal.amount)
            : acc,
        0
      );

      if (totalDebit > totalCredit) {
        obj.totalMassAmount += totalDebit - totalCredit;
      } else {
        obj.totalMassAmount += totalCredit - totalDebit;
      }

      obj.account.push({
        id: arr[i].account[j].id,
        accountName: arr[i].account[j].name,
        code: arr[i].account[j].code,
        totalDebit: totalDebit.toFixed(2),
        totalCredit: totalCredit.toFixed(2),
        valNet:
          totalDebit > totalCredit
            ? truncNumber((totalDebit - totalCredit)) + '(SD)'
            : truncNumber((totalCredit - totalDebit)) + '(SC)'
      });

      
    }

    newArr.push(obj);
  }

  return newArr;
}

