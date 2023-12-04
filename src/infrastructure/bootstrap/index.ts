import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import createDBConnection from "../typeorm/connection";
import { createExpressApp, runHttpServer } from "../express-server";
import { createApolloServer } from "../graphql-server";

const app = express();

const bootStrap = async () => {

    const Dbconnection = await createDBConnection();
    const { apolloServer, httpServer } = await createApolloServer( app, Dbconnection );
    await createExpressApp(apolloServer, app);

    runHttpServer(httpServer);
  
};

bootStrap();
