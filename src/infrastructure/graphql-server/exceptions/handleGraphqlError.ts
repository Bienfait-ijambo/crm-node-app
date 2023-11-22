import { GraphQLError } from "graphql";

export const handleGraphqlError=(error:GraphQLError) => {
    return {
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path,
    };
  }