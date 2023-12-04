"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesV1 = void 0;
const AccountTypeRoutes_1 = __importDefault(require("../../../api/type/v1/presentation/express/routes/V1/AccountTypeRoutes"));
const userRoutes_1 = __importDefault(require("../../../api/user/v1/presentation/express/routes/userRoutes"));
const routes_1 = __importDefault(require("../../../api/journal/v1/presentation/express/routes"));
const routes_2 = __importDefault(require("../../../api/tfr/presentation/express/routes"));
// import authRouter from "../../../api/user/v1/presentation/express/routes/authRoutes";
function routesV1(app) {
    app.use("/accounts", AccountTypeRoutes_1.default);
    app.use("/user", userRoutes_1.default);
    app.use("/", routes_1.default);
    app.use('/', routes_2.default);
    // app.use("/auth", authRouter);
}
exports.routesV1 = routesV1;
//# sourceMappingURL=RoutesV1.js.map