"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = require("http");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const handleGraphqlError_1 = require("./exceptions/handleGraphqlError");
const resolvers_1 = require("../../resolvers");
const schema_2 = require("../../schema");
const graphql_middleware_1 = require("graphql-middleware");
const permissions_1 = __importDefault(require("./middleware/permissions"));
const createApolloServer = (app, dbConnection) => __awaiter(void 0, void 0, void 0, function* () {
    const httpServer = (0, http_1.createServer)(app);
    const wsServer = new ws_1.WebSocketServer({ server: httpServer });
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.typeDefs, resolvers: resolvers_1.resolvers });
    const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
    const server = new apollo_server_express_1.ApolloServer({
        // cache:new InMemoryLRUCache(),
        cache: 'bounded',
        schema: (0, graphql_middleware_1.applyMiddleware)(schema, permissions_1.default),
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield serverCleanup.dispose();
                                });
                            },
                        };
                    });
                },
            },
        ],
        formatError: handleGraphqlError_1.handleGraphqlError,
        context: ({ req }) => {
            const accessToken = req === null || req === void 0 ? void 0 : req.headers.authorization;
            return { token: accessToken, dbConnection: dbConnection };
        },
    });
    yield server.start();
    return { apolloServer: server, httpServer };
});
exports.createApolloServer = createApolloServer;
//# sourceMappingURL=index.js.map