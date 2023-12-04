"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.UploadUserEnterpriseLogo = void 0;
const multer_1 = __importDefault(require("multer"));
const TypeormUserRepo_1 = require("../../../repository/TypeormUserRepo");
const CachError_1 = require("../../../../../../shared/exceptions/CachError");
const logger_1 = require("../../../../../../infrastructure/graphql-server/winston/logger");
const util_1 = require("../../../../../../shared/util/util");
const UploadEnterpriseLogo_1 = require("../../../domain-model/usecases/UploadEnterpriseLogo");
class UploadUserEnterpriseLogo {
    static upload(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const appUrl = process.env.APP_URL;
            const userId = req.query.userId;
            const moveFile = yield (0, util_1.moveFileToFolder)(req, res, "./public/images", "image");
            try {
                yield new Promise((resolve, reject) => {
                    moveFile(req, res, (err) => {
                        var _a;
                        if (err instanceof multer_1.default.MulterError) {
                            reject(new Error("Error occurred when uploading"));
                        }
                        else if (typeof ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) === "undefined") {
                            reject(new Error("Please select a file"));
                        }
                        else {
                            resolve("ok");
                        }
                    });
                });
                const imgurl = `${appUrl}images/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
                yield UploadUserEnterpriseLogo.saveImg(imgurl, userId);
                res.status(201).send({ message: "Image importer avec succès !", imgUrl: imgurl, success: true });
            }
            catch (error) {
                (0, logger_1.logErrorToFile)(error.message, 'multer-error');
                res.status(422).send({ message: "Veuillez selectionner une image moins de 2Mo !" });
            }
        });
    }
    static saveImg(imgUrl, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usecase = new UploadEnterpriseLogo_1.UploadUserEnterpriseLogoUseCase(TypeormUserRepo_1.userRepo);
            const input = {
                userId: userId,
                image: imgUrl
            };
            yield usecase.execute(input);
        });
    }
}
__decorate([
    CachError_1.catchError,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UploadUserEnterpriseLogo, "saveImg", null);
exports.UploadUserEnterpriseLogo = UploadUserEnterpriseLogo;
//# sourceMappingURL=UploadUserEnterPriseLogo.js.map