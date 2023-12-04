"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectResolvers = void 0;
const project_mutation_1 = require("./project.mutation");
const project_query_1 = require("./project.query");
exports.projectResolvers = {
    Query: project_query_1.projectQueries,
    Mutation: project_mutation_1.projectMutations
};
//# sourceMappingURL=index.js.map