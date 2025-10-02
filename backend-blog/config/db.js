import pkg from 'pg';
const { Pool }=pkg;
import dotenv from 'dotenv';
dotenv.config();

export default pool =new Pool({
    connectionString:process.env.DATABASE_URL
});

pool.on('contect',()=>{
    console.log('Postgresql connected');
});