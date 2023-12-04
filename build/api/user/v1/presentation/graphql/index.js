"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const user_mutation_1 = require("./user.mutation");
const user_query_1 = require("./user.query");
exports.userResolvers = {
    Query: user_query_1.userQueries,
    Mutation: user_mutation_1.userMutations
};
//# sourceMappingURL=index.js.map