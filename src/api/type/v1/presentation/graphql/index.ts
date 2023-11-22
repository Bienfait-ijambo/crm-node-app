import { typeMutations } from "./type.mutation";
import { typeQueries } from "./type.query";

export const typeResolvers={
    Mutation:typeMutations,
    Query:typeQueries
}