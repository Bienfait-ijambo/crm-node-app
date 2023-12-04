"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountResolvers = void 0;
const account_mutation_1 = require("./account.mutation");
const account_query_1 = require("./account.query");
exports.AccountResolvers = {
    Mutation: account_mutation_1.accountMutations,
    Query: account_query_1.accountQueries
};
//# sourceMappingURL=index.js.map