"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlFile = exports.generatePdf = exports.pdfCreatorNodejs = void 0;
const pdf = require("pdf-creator-node");
/**
 *
 * @param enterPrise
 * @returns
 */
function pdfCreatorNodejs(enterPrise) {
    const options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "1mm",
            contents: `
          <div style="text-align: center;">
          </div>
          `,
        },
        footer: {
            height: "5mm",
            contents: {
                first: `${enterPrise}`,
                2: "Second page",
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                last: "Last Page",
            },
        },
    };
    return options;
}
exports.pdfCreatorNodejs = pdfCreatorNodejs;
function generatePdf(document, options) {
    return new Promise((resolve, reject) => {
        pdf
            .create(document, options)
            .then((res) => {
            resolve(res);
        })
            .catch((error) => reject(error));
    });
}
exports.generatePdf = generatePdf;
/**
 * params ${htmlFile, object:data,outputPath,type}
 */
function getHtmlFile(html, data, outputPath, type) {
    const document = {
        html: html,
        data: data,
        path: outputPath,
        type: type,
    };
    return document;
}
exports.getHtmlFile = getHtmlFile;
//# sourceMappingURL=pdfCreatorNode.js.map