import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createServer } from "http";
import express, { Response, Request } from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import bodyParser from "body-parser";
import { handleGraphqlError } from "./exceptions/handleGraphqlError";
import { resolvers } from "../../resolvers";
import { typeDefs } from "../../schema";
import createDBConnection from "../typeorm/connection";
import { handleExpressError } from "./exceptions/handleExpressError";
import { applyMiddleware } from "graphql-middleware";
import permissions from "./middleware/permissions";
import { routesV1 } from "../express/routes/RoutesV1";

const cors = require('cors')


const app = express();

app.get("/api/v1/ready",  (req: Request, res: Response) => {
  res.send({ message: "Hello, you're up!" });
});


app.use(express.static("public"));

// Disable ETag header
app.set('etag', false);

// Disable X-Powered-By header
app.disable('x-powered-by');





const bootApp = async () => {
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
      return { token: accessToken };
    },
    
  });

  await server.start();



  app.use(cors())

 
  app.use(handleExpressError)
  
  app.use("/graphql", cors(), bodyParser.json());

  routesV1(app)

 
  await server.applyMiddleware({ app });

  await createDBConnection();


  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT,  () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
};

bootApp();
