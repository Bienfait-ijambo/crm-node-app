import { accountMutations } from "./account.mutation";
import { accountQueries } from "./account.query";

export const AccountResolvers={
    Mutation:accountMutations,
    Query:accountQueries
}