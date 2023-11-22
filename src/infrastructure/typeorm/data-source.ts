import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../../entities/User";
import { Account } from "../../entities/Account";
import { Mass } from "../../entities/Mass";
import { AccountType } from "../../entities/AccountType";
import { Journal } from "../../entities/Journal";
import { Partner } from "../../entities/Partner";
import { Project } from "../../entities/Project";
import { TreasuryAccount } from "../../entities/TreasuryAccount";
import { ProjectPayment } from "../../entities/ProjectPayment";
import { Service } from "../../entities/Service";
import { AggregateAccountAmount } from "../../entities/AggregateAccountAmount";
import { ServicePayment } from "../../entities/ServicePayment";
import {  clientPages } from "../../entities/ClientPages";
import { EnterpriseInfo } from "../../entities/EnterpriseInfo";
import { Tfr } from "../../entities/trf";

const mysqlConnection: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  logging: false,
  entities: [
    User,
    Account,
    AccountType,
    Mass,
    Journal,
    Partner,
    Project,
    TreasuryAccount,
    ProjectPayment,
    Service,
    AggregateAccountAmount,
    Tfr,
    ServicePayment,clientPages,EnterpriseInfo
  ],
  subscribers: [],
  migrations: ["src/infrastructure/typeorm/migrations/**/*{.ts,.js}"],
};

const { type, ...restOptions } = mysqlConnection;

export const postgresConnection: DataSourceOptions = {
  type: "postgres",
  ...restOptions,
};

const selectDb = () => {
  return process.env.DB_TYPE == "mysql" ? mysqlConnection : postgresConnection;
};

export const AppDataSource = new DataSource(selectDb());
