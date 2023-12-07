import http from "node:http";
import express, { Express,Request,Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { handleExpressError } from "../graphql-server/exceptions/handleExpressError";
import bodyParser from "body-parser";
import { routesV1 } from "./routes/RoutesV1";

const cors = require("cors");


type ExpressContext={}

export const createExpressApp = async (
  server:  ApolloServer<ExpressContext>,
  app:Express,
): Promise<express.Express> => {


  app.get("/api/v1/ready",  (req: Request, res: Response) => {
    res.send({ message: "Hello, you're up!" });
  });
  
  app.use(cors())

  app.use(express.json());

  app.use(express.static("public"));

  // Disable ETag header
  app.set("etag", false);

  // Disable X-Powered-By header
  app.disable("x-powered-by");


 
  app.use(handleExpressError)
  
  app.use("/graphql", cors(), bodyParser.json());

  routesV1(app)

 
  await server.applyMiddleware({ app });
  
  return app;
};




export const runHttpServer = (httpServer: http.Server) => {
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT , () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
};
