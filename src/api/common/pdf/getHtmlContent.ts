import { createReadStream } from "fs";
import { logErrorToFile } from "../../../infrastructure/graphql-server/winston/logger";





export async function  getHtmlContent(file:string) {
  try {
    const stream = createReadStream(file, { encoding: "utf8", });
    let result = "";
    for await (const chunk of stream) {
      result += chunk;
    }
    return result;
    
  } catch (error) {
    logErrorToFile('FailedToGetView','view-error')
  }
 
}