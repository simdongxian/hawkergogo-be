const mysql = require("mysql2");

const database = () => {

    const db = mysql.createConnection({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
    });

    const listingTable = `CREATE TABLE IF NOT EXISTS listing (id INT NOT NULL AUTO_INCREMENT, title VARCHAR(50), picture VARCHAR(200), description VARCHAR(50), endtime VARCHAR(50), date VARCHAR(50), location VARCHAR(50),  portionremaining VARCHAR(50), PRIMARY KEY(id) );`;
    const cartTable = `CREATE TABLE IF NOT EXISTS cart (listing_id INT, portion INT, PRIMARY KEY(listing_id) );`;
    const query = "INSERT INTO listing (title, picture, description, endtime, date, location,  portionremaining) SELECT * FROM (SELECT 'Chicken Rice', 'food_chickenrice', 'Delicious chick rice', '22:00', '2023-03-21', 'Prinsep Street', '5') AS FOO  WHERE NOT EXISTS (SELECT * FROM listing);"

    db.connect(function (err) {
        if (err) throw err;
        db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
        db.query(`use ${process.env.DATABASE}`, function (err, result, fields) {
            if (err) throw err;
        });
        db.query(listingTable, function (err, result, fields) {
            if (err) throw err;
        });
        db.query(cartTable, function (err, result, fields) {
            if (err) throw err;
        });
        db.query(query, function (err, result, fields) {
            if (err) throw err;
        });

    });
    return db
}
module.exports = database()