import { userMutations } from "./user.mutation";
import { userQueries } from "./user.query";


export const userResolvers={

    Query:userQueries,
    Mutation:userMutations
}


