"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const data_source_1 = require("../data-source");
const connection_1 = __importDefault(require("../connection"));
const PageActions_1 = require("../../../config/page/PageActions");
const accountSeed_1 = require("./accounts/accountSeed");
const logger_1 = require("../../graphql-server/winston/logger");
const ClientPages_1 = require("../../../entities/ClientPages");
function seedPageActions() {
    return __awaiter(this, void 0, void 0, function* () {
        const count = yield data_source_1.AppDataSource.getRepository(ClientPages_1.clientPages).count();
        if (count === 0) {
            for (let i = 0; i < PageActions_1.pageActions.length; i++) {
                yield data_source_1.AppDataSource.createQueryBuilder()
                    .insert()
                    .into("client_pages")
                    .values({
                    pageName: PageActions_1.pageActions[i],
                })
                    .execute();
            }
        }
        else {
            console.log("already seed ---> client_pages");
        }
    });
}
const runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connection_1.default)();
        yield Promise.all([(0, accountSeed_1.seedMass)(), (0, accountSeed_1.seedAccountType)()]);
        yield (0, accountSeed_1.attribAccountTypeMasses)();
        // seedPageActions();
        console.log("seed completed");
        process.exit();
    }
    catch (error) {
        console.log("seed-error", error.message);
        (0, logger_1.logErrorToFile)(error, "seed-error");
    }
});
runSeed();
//# sourceMappingURL=db-seed.js.map