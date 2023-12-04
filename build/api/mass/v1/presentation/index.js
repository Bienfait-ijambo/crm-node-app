"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.massResolvers = void 0;
const mass_mutation_1 = require("./mass.mutation");
const mass_query_1 = require("./mass.query");
exports.massResolvers = {
    Query: mass_query_1.massQueries,
    Mutation: mass_mutation_1.MassMutations
};
//# sourceMappingURL=index.js.map