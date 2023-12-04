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
const connection_1 = __importDefault(require("../connection"));
const data_source_1 = require("../data-source");
function dropTable(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.default)();
        try {
            const query = `DROP TABLE ${tableName}`;
            yield data_source_1.AppDataSource.query(query);
            console.log(`Table "${tableName}" dropped successfully.`);
        }
        catch (error) {
            console.error(`Error dropping table "${tableName}":`);
        }
    });
}
const dropTables = () => __awaiter(void 0, void 0, void 0, function* () {
    // Usage
    yield dropTable('user_page_action');
    yield dropTable('page_actions_action');
    yield dropTable('page');
});
dropTables();
//# sourceMappingURL=drop-tables.js.map