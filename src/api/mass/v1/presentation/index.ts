import { MassMutations } from "./mass.mutation";
import { massQueries } from "./mass.query";

export const massResolvers={
    Query:massQueries,
    Mutation:MassMutations
}