require("dotenv").config();

const mysql = require("mysql");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

console.log(process.env.HOST);
const db = mysql.createConnection({
	host: process.env.HOST,
	port: process.env.DBPORT,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: "hawkergogo",
});

const itemTable = `CREATE TABLE IF NOT EXISTS items (id INT NOT NULL AUTO_INCREMENT, title VARCHAR(50), picture VARCHAR(200), description VARCHAR(50),  starttime VARCHAR(50), endtime VARCHAR(50), location VARCHAR(50),  portionremaining VARCHAR(50), PRIMARY KEY(id) );`;
const query = "INSERT INTO items (title, picture, description,  starttime, endtime, location,  portionremaining) SELECT * FROM (SELECT 'Chicken Rice', 'https://singaporelocalfavourites.com/wp-content/uploads/2017/11/singapore-hainanese-roasted-chicken-rice.jpg', 'Delicious chick rice', '19:00', '22:00', 'Prinsep Street', '5') AS FOO  WHERE NOT EXISTS (SELECT * FROM items);"

db.connect(async function (err) {

	if (err) throw err;
	console.log("Connected!");

	db.query(itemTable, function (err, result, fields) {
		if (err) throw err;
	});

    db.query(query, function (err, result, fields) {
		if (err) throw err;
	});
    
});

app.get("/items", (req, res) => {
	db.query("SELECT * FROM items", function (err, result, fields) {
		if (err) throw err;
		return res.send(result);
	});
});

app.post("/items", (req, res) => {
    const { title, picture, description,  starttime, endtime, location,  portionremaining } = req.body
    const query = `INSERT INTO items (title, picture, description,  starttime, endtime, location,  portionremaining) VALUES ('${title}', '${picture}', '${description}',  '${starttime}', '${endtime}', '${location}',  '${portionremaining}');`
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		return res.send(result);
	});
});


app.put("/items", (req, res) => {
    const { id, title, picture, description,  starttime, endtime, location,  portionremaining } = req.body
    const query = `UPDATE items SET title = '${title}', picture = '${picture}', description = '${description}',  starttime = '${starttime}', endtime= '${endtime}', location = '${location}',  portionremaining = '${portionremaining}' WHERE id = ${id};`
	db.query(query, function (err, result, fields) {
		if (err) throw err;
		return res.send(result);
	});
});

app.delete("/items", (req, res) => {
    const { id } = req.body
    const query = `DELETE FROM items WHERE id = '${id}'`
    db.query(query, function (err, result, fields) {
		if (err) throw err;
		return res.send(result);
	});
});

app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`)
);
