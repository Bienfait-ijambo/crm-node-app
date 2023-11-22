import { ServiceMutations } from "./service.mutation";
import { ServiceQueries } from "./service.query";

export const ServiceResolvers={
    Query:ServiceQueries,
    Mutation:new ServiceMutations()
}