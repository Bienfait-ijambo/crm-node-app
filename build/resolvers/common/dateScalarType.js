"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateScalarType = void 0;
const graphql_1 = require("graphql");
exports.dateScalarType = {
    Date: new graphql_1.GraphQLScalarType({
        name: 'Date',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize(value) {
            // return GraphQLDate.serialize(value)
            return new Date(value).toISOString();
        },
    })
};
//# sourceMappingURL=dateScalarType.js.map