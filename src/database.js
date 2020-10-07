import mysql from 'mysql';
import { promisify } from 'util';
import { database } from './keys';

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if(err.code === 'PROTOCOL_CONNECTION_ERROR'){
            console.error('DATABASE_CONNECTION WAS CLOSED');
        }
        if(err.code === 'ERR_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is connected');
    return;
});

//Pool query Promisify
pool.query = promisify(pool.query);

export default pool;