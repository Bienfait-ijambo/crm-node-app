// import {parentPort} from 'node:worker_threads'
// import { JournalTransactionType } from "../../../../../../../../entities/Journal";
// import { logErrorToFile } from "../../../../../../../../infrastructure/graphql-server/winston/logger";
// import { formatDate } from "../../../../../../../../shared/util/dateUtils";
// import { parentPort } from 'node:worker_threads';
// const {parentPort}=require('node:worker_threads')
// // Array<ISingleTransaction>
// parentPort.on('message', (data) => {
//   parentPort.postMessage(result);
// });
process.on("message", function (msg) {
    const result = ProcessSingleAccountTransaction.execute(msg);
    // const generator=generateColors()
    // const color=generateColors().next().value
    process.send({ res: result });
    // //long calculations ..
    // setTimeout(function () {
    //   process.send({ status: "Done!" });
    //   console.log('pid : ',process.pid)
    //   console.log(process.debugPort)
    //   //notify node, that we are done with this task
    //   process.disconnect();
    // }, 5000);
});
//  interface ISingleTransaction {
//   id: number;
//   amount: string;
//   transactionType: number;
//   description: string;
//   createdAt: string;
// }
class ProcessSingleAccountTransaction {
    static getDebitOperation(array) {
        const filteredOperations = array.filter((transaction) => transaction.transactionType === 1);
        return filteredOperations;
    }
    static getCreditOperation(array) {
        const filteredOperations = array.filter((transaction) => transaction.transactionType === 2);
        return filteredOperations;
    }
    static execute(array) {
        var _a, _b, _c;
        const debitTransaction = ProcessSingleAccountTransaction.getDebitOperation(array);
        const creditTransaction = ProcessSingleAccountTransaction.getCreditOperation(array);
        const newArray = [];
        // push all debit operations
        for (let i = 0; i < debitTransaction.length; i++) {
            newArray.push({
                debit: {
                    date: (_a = array[i]) === null || _a === void 0 ? void 0 : _a.createdAt,
                    description: (_b = array[i]) === null || _b === void 0 ? void 0 : _b.description,
                    amount: (_c = array[i]) === null || _c === void 0 ? void 0 : _c.amount,
                },
                credit: {
                    date: "",
                    description: "",
                    amount: "",
                },
            });
        }
        for (let j = 0; j < newArray.length; j++) {
            const transaction = creditTransaction.pop();
            newArray[j].credit = {
                date: transaction === null || transaction === void 0 ? void 0 : transaction.createdAt,
                description: transaction === null || transaction === void 0 ? void 0 : transaction.description,
                amount: transaction === null || transaction === void 0 ? void 0 : transaction.amount,
            };
        }
        return newArray;
    }
}
//# sourceMappingURL=processSingleAccountTransactions.js.map