
import * as dotenv from "dotenv";
dotenv.config();

const { exec } = require('child_process');

function executeScript(command) {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve('');
      }
    });

    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
  });
}

async function executeMultipleScripts(scripts) {
  try {
    for (const script of scripts) {
      console.log(`Executing script: ${script}`);
      await executeScript(script);
      console.log(`Script executed successfully: ${script}`);
      console.log('-------------------------');
    }
  } catch (error) {
    console.error('Error executing scripts:', error.message);
  }
}

// Example usage:

// build-schema,compile


async function build(){

  if(process.env.NODE_ENV==='production'){
    const scriptsToExecute = ['npm install && npm run db-seed-prod'];
       await  executeMultipleScripts(scriptsToExecute);
  }

  if(process.env.NODE_ENV==='development'){
    const scriptsToExecute = ['npm run compile','npm run build-schema','npm run db-seed-dev'];
   await executeMultipleScripts(scriptsToExecute);
  }
}


build()

