import { GraphQLScalarType } from "graphql"

export const dateScalarType={
    Date:new GraphQLScalarType({
        name: 'Date',
        description: 'A date and time, represented as an ISO-8601 string',
      serialize(value:string) {
        // return GraphQLDate.serialize(value)
        return new Date(value).toISOString()
      },
    })
}
