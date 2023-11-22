import fs from "fs";

export async function getFileSize(filePath: string): Promise<number> {
  const stats = await fs.promises.stat(filePath);
  const sizeInBytes = stats.size;
  return sizeInBytes; //file size in bytes
}
