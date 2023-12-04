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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { exec } = require('child_process');
function executeScript(command) {
    return new Promise((resolve, reject) => {
        const childProcess = exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                resolve('');
            }
        });
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
    });
}
function executeMultipleScripts(scripts) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const script of scripts) {
                console.log(`Executing script: ${script}`);
                yield executeScript(script);
                console.log(`Script executed successfully: ${script}`);
                console.log('-------------------------');
            }
        }
        catch (error) {
            console.error('Error executing scripts:', error.message);
        }
    });
}
// Example usage:
// build-schema,compile
function build() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.NODE_ENV === 'production') {
            const scriptsToExecute = ['npm install && npm run db-seed-prod'];
            yield executeMultipleScripts(scriptsToExecute);
        }
        if (process.env.NODE_ENV === 'development') {
            const scriptsToExecute = ['npm run compile', 'npm run build-schema', 'npm run db-seed-dev'];
            yield executeMultipleScripts(scriptsToExecute);
        }
    });
}
build();
//# sourceMappingURL=build-app.js.map