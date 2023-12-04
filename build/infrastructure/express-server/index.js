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
exports.runHttpServer = exports.createExpressApp = void 0;
const express_1 = __importDefault(require("express"));
const handleExpressError_1 = require("../graphql-server/exceptions/handleExpressError");
const body_parser_1 = __importDefault(require("body-parser"));
const RoutesV1_1 = require("./routes/RoutesV1");
const cors = require("cors");
const createExpressApp = (server, app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get("/api/v1/ready", (req, res) => {
        res.send({ message: "Hello, you're up!" });
    });
    app.use(express_1.default.json());
    app.use(express_1.default.static("public"));
    // Disable ETag header
    app.set("etag", false);
    // Disable X-Powered-By header
    app.disable("x-powered-by");
    app.use(handleExpressError_1.handleExpressError);
    app.use("/graphql", cors(), body_parser_1.default.json());
    (0, RoutesV1_1.routesV1)(app);
    yield server.applyMiddleware({ app });
    return app;
});
exports.createExpressApp = createExpressApp;
const runHttpServer = (httpServer) => {
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
};
exports.runHttpServer = runHttpServer;
//# sourceMappingURL=index.js.map