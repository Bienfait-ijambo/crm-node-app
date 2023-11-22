import { Express } from "express";
import accountTypeRouter from "../../../api/type/v1/presentation/express/routes/V1/AccountTypeRoutes";
import userRoutes from "../../../api/user/v1/presentation/express/routes/userRoutes";
import journalRouter from "../../../api/journal/v1/presentation/express/routes";
// import authRouter from "../../../api/user/v1/presentation/express/routes/authRoutes";

export function routesV1(app: Express) {
  app.use("/accounts", accountTypeRouter);
  app.use("/user", userRoutes);
  app.use("/", journalRouter);

  // app.use("/auth", authRouter);
}
