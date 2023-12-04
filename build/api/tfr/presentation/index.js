"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tfrResolvers = void 0;
const tfr_query_1 = require("./tfr.query");
const trf_mutation_1 = require("./trf.mutation");
exports.tfrResolvers = {
    Query: tfr_query_1.TfrQueries,
    Mutation: trf_mutation_1.TfrMutations
};
//# sourceMappingURL=index.js.map