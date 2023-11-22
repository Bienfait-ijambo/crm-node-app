
import multer = require("multer");
import path = require("path");

/**
 *
 * @returns string
 * Generate a string of 20 characters
 */
export const generateCode = () => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${randomNumber}`;
};

export function checkPerformance(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      console.time("performance");
      await originalMethod.apply(this, args);
      console.timeEnd("performance");
    } catch (error) {
      console.error(`An error occurred in ${propertyKey}:`);
    }
  };

  return descriptor;
}

export function todayDate() {
  const date = new Date();
  return date.toISOString().slice(0, 10);
}

export function getPreviousDate(currDate: Date, days: number): string {
  var currentDate = new Date(currDate);
  var previousDate1 = new Date(currentDate);
  previousDate1.setDate(currentDate.getDate() - days);
  return previousDate1.toISOString().split("T")[0];
}

export const generateFileName = (originalFileName) => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000);
  const extension = path.extname(originalFileName);
  return `${timestamp}-${randomNumber}${extension}`;
};






export async function moveFileToFolder( req: any, res: any, path: string, fieldName: string ) {
  const storage = await multer.diskStorage({
    destination: function (req, file: any, cb) {
      cb(null, path);
    },

    filename: function (req, file, cb) {
      const newFileName = generateFileName(file.originalname);
      cb(null, newFileName);
    },
  });

  const fileFilter = function (req: any, file: any, cb: any) {
    const allowedFileTypes = ["image/gif", "image/png", "image/jpeg", "image/jpg"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
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
}


/**
 * 
 * @param viewName 
 * get view path in views folder
 */

export function getViewPath(viewName: string){
  const rootPath = process.cwd();
  const viewPath = path.join(rootPath, "views", viewName);
  return viewPath;
}


/**
 * 
 * @param n 
 * @returns number
 * get one number after a point
 */
export function truncNumber(n: number) {
  const truncatedNumber = Math.floor(n * 10) / 10;
  return truncatedNumber;
}