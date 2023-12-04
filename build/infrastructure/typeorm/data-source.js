"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.postgresConnection = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entities/User");
const Account_1 = require("../../entities/Account");
const Mass_1 = require("../../entities/Mass");
const AccountType_1 = require("../../entities/AccountType");
const Journal_1 = require("../../entities/Journal");
const Partner_1 = require("../../entities/Partner");
const Project_1 = require("../../entities/Project");
const TreasuryAccount_1 = require("../../entities/TreasuryAccount");
const ProjectPayment_1 = require("../../entities/ProjectPayment");
const Service_1 = require("../../entities/Service");
const AggregateAccountAmount_1 = require("../../entities/AggregateAccountAmount");
const ServicePayment_1 = require("../../entities/ServicePayment");
const ClientPages_1 = require("../../entities/ClientPages");
const EnterpriseInfo_1 = require("../../entities/EnterpriseInfo");
const Trf_1 = require("../../entities/Trf");
const TfrResultAccount_1 = require("../../entities/TfrResultAccount");
const PeriodicTfrResult_1 = require("../../entities/PeriodicTfrResult");
const mysqlConnection = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    logging: false,
    entities: [
        User_1.User,
        Account_1.Account,
        AccountType_1.AccountType,
        Mass_1.Mass,
        Journal_1.Journal,
        Partner_1.Partner,
        Project_1.Project,
        TreasuryAccount_1.TreasuryAccount,
        ProjectPayment_1.ProjectPayment,
        Service_1.Service,
        AggregateAccountAmount_1.AggregateAccountAmount,
        Trf_1.Tfr,
        ServicePayment_1.ServicePayment, ClientPages_1.clientPages, EnterpriseInfo_1.EnterpriseInfo, TfrResultAccount_1.TfrResultAccount, PeriodicTfrResult_1.PeriodicTfrResult
    ],
    subscribers: [],
    migrations: ["src/infrastructure/typeorm/migrations/**/*{.ts,.js}"],
};
const { type } = mysqlConnection, restOptions = __rest(mysqlConnection, ["type"]);
exports.postgresConnection = Object.assign({ type: "postgres" }, restOptions);
const selectDb = () => {
    return process.env.DB_TYPE === "mysql" ? mysqlConnection : exports.postgresConnection;
};
exports.AppDataSource = new typeorm_1.DataSource(selectDb());
//# sourceMappingURL=data-source.js.map