import { createReadStream } from "fs";
import { logErrorToFile } from "../../../infrastructure/graphql-server/winston/logger";





/**
 * 
 * @param filePath 
 * @returns file content
 */
export async function  getHtmlContent(filePath:string) {
  try {
    const stream = createReadStream(filePath, { encoding: "utf8", });
    let result = "";
    for await (const chunk of stream) {
      result += chunk;
    }
    return result;
    
  } catch (error) {
    logErrorToFile('FailedToGetView','view-error')
  }
 
}