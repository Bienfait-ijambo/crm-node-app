import { enumMassType } from "../../../../../../entities/Mass";

export function getActifMasses(arr: any) {
  return new Promise<any[]>((resolve) => {
    const actif = arr.filter(
      (item: any) =>
        item.id == enumMassType.ACTIF_CIRCULANT ||
        item.id == enumMassType.ACTIF_IMMOBILISER ||
        item.id == enumMassType.TRESORERIE_ACTIF
    );

    resolve(createSoldInBilan(actif));
  });
}

export function getPassifMasses(arr: any) {
  return new Promise<any[]>((resolve) => {
    const passif = arr.filter(
      (item: any) =>
        item.id == enumMassType.PASSIF_CIRCULANT ||
        item.id == enumMassType.RESOURCES_DURABLE_ET_EMPRUNTS ||
        item.id == enumMassType.TRESORERIE_PASSIF
    );

    resolve(createSoldInBilan(passif));
  });
}

export function createSoldInBilan(arr: any) {
  const newArr = [];
  // let totalType=0

  for (let i = 0; i < arr.length; i++) {
    const obj = {
      id: arr[i].id,
      name: arr[i].name,
      totalMassAmount: 0,
      account: [],
    } as any;

    for (let j = 0; j < arr[i].account.length; j++) {
      const totalDebit = arr[i].account[j].journals.reduce(
        (acc: number, currVal: any) =>
          parseInt(currVal.transactionType) === 1
            ? acc + parseFloat(currVal.amount)
            : acc,
        0
      );
      const totalCredit = arr[i].account[j].journals.reduce(
        (acc: number, currVal: any) =>
          parseInt(currVal.transactionType) === 2
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
        name: arr[i].account[j].name,
        code: arr[i].account[j].code,
        totalDebit: totalDebit,
        totalCredit: totalCredit,
        valNet:
          totalDebit > totalCredit
            ? (totalDebit - totalCredit).toFixed(2)
            : (totalCredit - totalDebit).toFixed(2),
      });
    }

    newArr.push(obj);
  }

  return newArr;
}
