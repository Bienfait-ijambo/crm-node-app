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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = exports.getTypeDeftsInProduction = exports.writeTypeDefs = exports.returnTypeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const path = __importStar(require("path"));
const fs_1 = require("fs");
function foldersInSchemaFolder() {
    const files = (0, fs_1.readdirSync)(path.join(__dirname), { withFileTypes: true });
    const folders = files
        .filter((file) => file.isDirectory())
        .map((folder) => folder.name);
    return folders;
}
function returnTypeDefs() {
    const folders = foldersInSchemaFolder();
    const typesDefs = folders.map((type) => {
        const schemaDir = path.join(__dirname, type);
        const schemaFiles = (0, fs_1.readdirSync)(schemaDir).filter((file) => file.endsWith(".graphql"));
        const schema = schemaFiles
            .map((file) => {
            const filePath = path.join(schemaDir, file);
            return (0, fs_1.readFileSync)(filePath, "utf8");
        })
            .join("");
        return schema;
    });
    return typesDefs;
}
exports.returnTypeDefs = returnTypeDefs;
function writeTypeDefs(filePath, typeDefs) {
    let all = "";
    for (var i = 0; i < typeDefs.length; i++) {
        all += typeDefs[i];
    }
    (0, fs_1.writeFile)(filePath, all, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return;
        }
        console.log("typeDefs written successfully to txt file !.");
    });
}
exports.writeTypeDefs = writeTypeDefs;
function getTypeDeftsInProduction() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const stream = (0, fs_1.createReadStream)(path.join(__dirname) + "/typedefs.txt", {
            encoding: "utf8",
        });
        let result = "";
        try {
            for (var _d = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a;) {
                _c = stream_1_1.value;
                _d = false;
                try {
                    const chunk = _c;
                    result += chunk;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    });
}
exports.getTypeDeftsInProduction = getTypeDeftsInProduction;
function graphqlSchema() {
    if (process.env.NODE_ENV === "production") {
        const allSchema = (0, fs_1.readFileSync)(path.join(__dirname) + "/typedefs.txt", {
            encoding: "utf-8",
        });
        return [allSchema];
    }
    if (process.env.NODE_ENV === "development") {
        return returnTypeDefs();
    }
}
exports.typeDefs = (0, merge_1.mergeTypeDefs)(graphqlSchema());
//# sourceMappingURL=index.js.map