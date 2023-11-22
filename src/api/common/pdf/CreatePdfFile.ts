import { generatePdf, getHtmlFile, pdfCreatorNodejs } from "../../../config/pdf/pdfCreatorNode";
import { EnterpriseInfo } from "../../../entities/EnterpriseInfo";



/**
 * 
 * create a pdf file and move it to public folder
 */
export async function  createPdfFile(htmlContent:string,data:any,headerData: EnterpriseInfo,fileName:string){

    const timestamp = Date.now();
    
    const file=`pdf/${fileName}-${timestamp}.pdf`

    //get file detail like, path,content
    const document = getHtmlFile(htmlContent, data, `public/${file}`, "");
 

    //generate and save pdf to  public/pdf folder
    await generatePdf(document, pdfCreatorNodejs(headerData.name));

    const clientUrl=`${process.env.APP_URL}${file}`;

    return {clientUrl}
  }