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
exports.truncNumber = exports.getViewPath = exports.moveFileToFolder = exports.generateFileName = exports.getPreviousDate = exports.todayDate = exports.checkPerformance = exports.generateCode = void 0;
const multer = require("multer");
const path = require("path");
/**
 *
 * @returns string
 * Generate a string of 20 characters
 */
const generateCode = () => {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNumber}`;
};
exports.generateCode = generateCode;
function checkPerformance(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.time("performance");
                yield originalMethod.apply(this, args);
                console.timeEnd("performance");
            }
            catch (error) {
                console.error(`An error occurred in ${propertyKey}:`);
            }
        });
    };
    return descriptor;
}
exports.checkPerformance = checkPerformance;
function todayDate() {
    const date = new Date();
    return date.toISOString().slice(0, 10);
}
exports.todayDate = todayDate;
function getPreviousDate(currDate, days) {
    var currentDate = new Date(currDate);
    var previousDate1 = new Date(currentDate);
    previousDate1.setDate(currentDate.getDate() - days);
    return previousDate1.toISOString().split("T")[0];
}
exports.getPreviousDate = getPreviousDate;
const generateFileName = (originalFileName) => {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000);
    const extension = path.extname(originalFileName);
    return `${timestamp}-${randomNumber}${extension}`;
};
exports.generateFileName = generateFileName;
function moveFileToFolder(req, res, path, fieldName) {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = yield multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path);
            },
            filename: function (req, file, cb) {
                const newFileName = (0, exports.generateFileName)(file.originalname);
                cb(null, newFileName);
            },
        });
        const fileFilter = function (req, file, cb) {
            const allowedFileTypes = ["image/gif", "image/png", "image/jpeg", "image/jpg"];
            if (allowedFileTypes.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new Error("Invalid file type. Only GIF, PNG, JPEG, and JPG files are allowed."));
            }
        };
        const upload = multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                fileSize: 2 * 1024 * 1024, // Limit the file size to 2MB
            },
        }).single(fieldName);
        return upload;
    });
}
exports.moveFileToFolder = moveFileToFolder;
/**
 *
 * @param file
 * @returns : file path located in views-folder
 */
function getViewPath(file) {
    const rootPath = process.cwd();
    const viewPath = path.join(rootPath, "views", file);
    return viewPath;
}
exports.getViewPath = getViewPath;
/**
 *
 * @param n
 * @returns number
 * get one number after a point
 */
function truncNumber(n) {
    const truncatedNumber = Math.floor(n * 10) / 10;
    return truncatedNumber;
}
exports.truncNumber = truncNumber;
//# sourceMappingURL=util.js.map