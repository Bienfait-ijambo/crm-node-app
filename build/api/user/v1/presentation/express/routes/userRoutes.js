"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UploadUserImage_1 = require("../usecases/UploadUserImage");
const UploadUserEnterPriseLogo_1 = require("../usecases/UploadUserEnterPriseLogo");
const Jwt_1 = require("../../../../../../middleware/Jwt");
const userRoutes = express_1.default.Router();
userRoutes.post("/upload-image", Jwt_1.JwtToken.VerifyExpressToken, UploadUserImage_1.UploadUserPhoto.upload);
userRoutes.post('/upload-logo', Jwt_1.JwtToken.VerifyExpressToken, UploadUserEnterPriseLogo_1.UploadUserEnterpriseLogo.upload);
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map