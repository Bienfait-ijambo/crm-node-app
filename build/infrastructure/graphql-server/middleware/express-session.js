"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPRESS_SESSION = void 0;
const connect_redis_1 = __importDefault(require("connect-redis"));
const redisService_1 = require("../../services/redisService");
const session = require('express-session');
// Initialize store.
let redisStore = new connect_redis_1.default({
    client: redisService_1.redisClient,
    prefix: "myapp:",
});
exports.EXPRESS_SESSION = session({
    store: redisStore,
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: process.env.NODE_ENV === 'production' ? true : false,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 24 * 60 * 60 * 1000, // Expiration time in milliseconds (1 day)
    }
});
//# sourceMappingURL=express-session.js.map