"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeResolvers = void 0;
const type_mutation_1 = require("./type.mutation");
const type_query_1 = require("./type.query");
exports.typeResolvers = {
    Mutation: type_mutation_1.typeMutations,
    Query: type_query_1.typeQueries
};
//# sourceMappingURL=index.js.map