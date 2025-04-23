import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'chartpt',
  password: 'wlstjd1153',
});

export const db = pool.promise();
