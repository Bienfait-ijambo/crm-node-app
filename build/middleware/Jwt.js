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
exports.JwtToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtPayload_1 = require("./jwtPayload");
class JwtToken {
    static signAccessToken(userId) {
        return new Promise((resolve, reject) => {
            const payload = (0, jwtPayload_1.jwtPayload)(userId);
            (0, jsonwebtoken_1.sign)(payload, JwtToken.privateKey, (err, token) => {
                if (err)
                    throw new Error('Failed to generate signAccessToken !');
                resolve(token);
            });
        });
    }
    static signRefreshToken(userId) {
        return new Promise((resolve, reject) => {
            const payload = (0, jwtPayload_1.jwtPayload)(userId);
            (0, jsonwebtoken_1.sign)(payload, JwtToken.refreshTokenKey, (err, token) => {
                if (err)
                    throw new Error('Failed to generate signRefreshToken !');
                resolve(token);
            });
        });
    }
    //to change
    static verifyRefreshToken(refreshToken) {
        if (typeof refreshToken !== "undefined") {
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.verify)(refreshToken, JwtToken.refreshTokenKey, (error, payload) => {
                    if (error)
                        throw new Error('Unauthorized');
                    return resolve(payload);
                });
            });
        }
    }
    static verifyGraphqlToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = token.split(" ")[1];
                (0, jsonwebtoken_1.verify)(accessToken, JwtToken.privateKey, (error, payload) => {
                    if (error) {
                        throw new Error('Unauthorized');
                    }
                });
            }
            catch (error) {
                throw new Error("Unauthorize");
            }
        });
    }
    static VerifyExpressToken(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
                const accessToken = token.split(" ")[1];
                (0, jsonwebtoken_1.verify)(accessToken, JwtToken.privateKey, (error, payload) => {
                    if (error) {
                        throw new Error('Unauthorize');
                    }
                    else {
                        next();
                    }
                });
            }
            catch (error) {
                res.status(401).send({ message: "Unauthorize" });
            }
        });
    }
}
exports.JwtToken = JwtToken;
JwtToken.privateKey = process.env.JWT_TOKEN_KEY;
JwtToken.refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
//# sourceMappingURL=Jwt.js.map