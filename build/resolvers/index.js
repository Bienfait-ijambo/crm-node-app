"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const graphql_1 = require("../api/user/v1/presentation/graphql");
const auth_mutation_1 = require("../api/user/v1/presentation/graphql/auth.mutation");
const presentation_1 = require("../api/account/v1/presentation");
const graphql_2 = require("../api/type/v1/presentation/graphql");
const presentation_2 = require("../api/mass/v1/presentation");
const presentation_3 = require("../api/partner/v1/presentation");
const presentation_4 = require("../api/projet/v1/presentation");
const resolvers_1 = require("../api/journal/v1/presentation/resolvers");
const dateScalarType_1 = require("./common/dateScalarType");
const presentation_5 = require("../api/service/v1/presentation");
const presentation_6 = require("../api/aggregate-account-amount/presentation");
const graphql_3 = require("../config/page/presentation/graphql");
const presentation_7 = require("../api/tfr/presentation");
const resolversArray = [
    auth_mutation_1.authMutations,
    graphql_1.userResolvers,
    presentation_1.AccountResolvers,
    graphql_2.typeResolvers,
    presentation_2.massResolvers,
    presentation_3.partnerResolvers,
    presentation_4.projectResolvers,
    resolvers_1.journalResolvers,
    dateScalarType_1.dateScalarType,
    presentation_5.ServiceResolvers,
    presentation_6.aggregateAccountResolver,
    graphql_3.pageResolvers,
    presentation_7.tfrResolvers
];
exports.resolvers = (0, merge_1.mergeResolvers)(resolversArray);
//# sourceMappingURL=index.js.map