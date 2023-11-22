
import { getConnectionManager } from 'typeorm';
import createDBConnection from '../connection';
import { AppDataSource } from '../data-source';



async function dropTable(tableName: string): Promise<void> {
  await createDBConnection();

  

  try {
    

    const query = `DROP TABLE ${tableName}`;
  await AppDataSource.query(query);
    
    console.log(`Table "${tableName}" dropped successfully.`);
  } catch (error) {
    console.error(`Error dropping table "${tableName}":`);
  } 
}




const dropTables=async ()=>{
// Usage
await dropTable('user_page_action');
await dropTable('page_actions_action')
await dropTable('page')

}

dropTables()