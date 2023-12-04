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
exports.createPdfFile = void 0;
const pdfCreatorNode_1 = require("../../../config/pdf/pdfCreatorNode");
/**
 *
 * @param htmlContent
 * @param data
 * @param headerData
 * @param fileName
 * @returns  {string} URL
 * Create a pdf file and move it to public folder
 */
function createPdfFile(htmlContent, data, headerData, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = Date.now();
        const file = `pdf/${fileName}-${timestamp}.pdf`;
        //get file detail like, path,content
        const document = (0, pdfCreatorNode_1.getHtmlFile)(htmlContent, data, `public/${file}`, "");
        //generate and save pdf to  public/pdf folder
        yield (0, pdfCreatorNode_1.generatePdf)(document, (0, pdfCreatorNode_1.pdfCreatorNodejs)(headerData.name));
        const clientUrl = `${process.env.APP_URL}${file}`;
        return { clientUrl };
    });
}
exports.createPdfFile = createPdfFile;
//# sourceMappingURL=CreatePdfFile.js.map