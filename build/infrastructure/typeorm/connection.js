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
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../graphql-server/winston/logger");
const data_source_1 = require("./data-source");
function createDBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield data_source_1.AppDataSource.initialize();
            console.log('database connection established....');
            (0, logger_1.logErrorToFile)("db-started...", "db-started");
            return db;
        }
        catch (error) {
            console.log("database error: " + error.message);
            (0, logger_1.logErrorToFile)("Failed to connect to the DB : ", "db-error-msg");
        }
    });
}
exports.default = createDBConnection;
//# sourceMappingURL=connection.js.map