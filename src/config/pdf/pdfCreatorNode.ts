
const pdf = require("pdf-creator-node");

/**
 * 
 * @param enterPrise 
 * @returns 
 */
  export function pdfCreatorNodejs(enterPrise:string){
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
            first:  `${enterPrise}`,
            2: "Second page", // Any page number is working. 1-based index
            default:
              '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: "Last Page",
          },
        },
      };
      return options
  }


  export  function generatePdf(document:any,options:any){

    return   new Promise((resolve,reject)=>{
        pdf
        .create(document, options)
        .then((res) => {
          resolve(res)
        })
        .catch((error) =>reject(error));
    })
   
}
/**
 * params ${htmlFile, object:data,outputPath,type}
 */
export function getHtmlFile(html:string,data:any,outputPath,type:string){
  const document = {
    html: html,
    data:data,
    path: outputPath,
    type: type,
  };
  return document

}

