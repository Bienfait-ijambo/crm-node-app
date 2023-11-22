import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "../api/user/v1/presentation/graphql";
import { authMutations } from "../api/user/v1/presentation/graphql/auth.mutation";
import { AccountResolvers } from "../api/account/v1/presentation";
import { typeResolvers } from "../api/type/v1/presentation/graphql";
import { massResolvers } from "../api/mass/v1/presentation";
import { partnerResolvers } from "../api/partner/v1/presentation";
import { projectResolvers } from "../api/projet/v1/presentation";
import { journalResolvers } from "../api/journal/v1/presentation/resolvers";
import { dateScalarType } from "./common/dateScalarType";
import { ServiceResolvers } from "../api/service/v1/presentation";
import { aggregateAccountResolver } from "../api/aggregate-account-amount/presentation";
import { pageResolvers } from "../config/page/presentation/graphql";



const resolversArray = [
  authMutations,
  userResolvers,
  AccountResolvers,
  typeResolvers,
  massResolvers,
  partnerResolvers,
  projectResolvers,
  journalResolvers,
  dateScalarType,
  ServiceResolvers,
  aggregateAccountResolver,
  pageResolvers
];
 
export const resolvers = mergeResolvers(resolversArray);

