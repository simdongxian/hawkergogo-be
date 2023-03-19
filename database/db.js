const mysql = require("mysql2");

const database = () => {
    const db = mysql.createConnection({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });
    return db
}

module.exports = database();
