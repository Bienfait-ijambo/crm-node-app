

const winston = require('winston');


export async function logErrorToFile(error:any, fileName:string):Promise<void> {
    const logger =  winston.createLogger({
      transports: [
        new winston.transports.File({ filename: `log-errors/${fileName}` }),
      ],
    });
  
    logger.error(error);
  }

