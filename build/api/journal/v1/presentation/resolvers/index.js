"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.journalResolvers = void 0;
const journal_mutation_1 = require("./journal.mutation");
const journal_query_1 = require("./journal.query");
exports.journalResolvers = {
    Query: journal_query_1.journalQueries,
    Mutation: journal_mutation_1.journalMutations
};
//# sourceMappingURL=index.js.map