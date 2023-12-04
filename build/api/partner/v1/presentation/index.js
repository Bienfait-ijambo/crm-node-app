"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerResolvers = void 0;
const partner_mutation_1 = require("./partner.mutation");
const partner_query_1 = require("./partner.query");
exports.partnerResolvers = {
    Query: partner_query_1.partnerQueries,
    Mutation: partner_mutation_1.partnerMutations
};
//# sourceMappingURL=index.js.map