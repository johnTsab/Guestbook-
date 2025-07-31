const mysql = require("mysql2");

const pool = mysql.createConnection({
    host : "localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"guestbook",
    connectionLimit:10
})

pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected to the database succesfully');
    connection.release();
})

module.exports = pool;