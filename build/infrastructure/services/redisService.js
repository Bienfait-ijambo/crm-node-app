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
exports.connectToRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const logger_1 = require("../graphql-server/winston/logger");
exports.redisClient = (0, redis_1.createClient)();
function connectToRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.redisClient.connect();
            console.log('connected to redis');
        }
        catch (error) {
            console.log("Redis Error : ", error.message);
            yield (0, logger_1.logErrorToFile)(error, "Redis-error");
        }
    });
}
exports.connectToRedis = connectToRedis;
//# sourceMappingURL=redisService.js.map