"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResolvers = void 0;
const service_mutation_1 = require("./service.mutation");
const service_query_1 = require("./service.query");
exports.ServiceResolvers = {
    Query: service_query_1.ServiceQueries,
    Mutation: new service_mutation_1.ServiceMutations()
};
//# sourceMappingURL=index.js.map