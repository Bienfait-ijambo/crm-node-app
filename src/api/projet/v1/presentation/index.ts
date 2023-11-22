import { projectMutations } from "./project.mutation";
import { projectQueries } from "./project.query";


export const projectResolvers={

    Query:projectQueries,
    Mutation:projectMutations
}


