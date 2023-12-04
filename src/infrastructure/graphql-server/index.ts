
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createServer } from "http";
import express, { Express } from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { handleGraphqlError } from "./exceptions/handleGraphqlError";
import { resolvers } from "../../resolvers";
import { typeDefs } from "../../schema";
import { applyMiddleware } from "graphql-middleware";
import permissions from "./middleware/permissions";
import { DataSource } from "typeorm";






export const createApolloServer = async (app:Express,dbConnection: DataSource) => {
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({ server: httpServer });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    // cache:new InMemoryLRUCache(),
    // cache: "bounded",
    schema: applyMiddleware(
      schema,
      permissions
    ),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    formatError: handleGraphqlError,
    context: ({ req }) => {
      const accessToken = req?.headers.authorization as string;
      return { token: accessToken ,dbConnection:dbConnection };
    },
    
  });

  await server.start();

  return{apolloServer:server,httpServer}
};


