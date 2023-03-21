const express = require('express')
const router = express.Router();
const db = require('../database/db')

router.get("/", (req, res) => {
    db.query("SELECT * FROM listing ORDER BY ID DESC", function (err, result, fields) {
        if (err) throw err;
        return res.send(result);
    });
});

router.post("/", (req, res) => {
    const { title, picture, description, endtime, date, location, portionremaining } = req.body
    console.log(location);
    // console.log(title, picture, description, endtime, date, location, portionremaining);
    const query = `INSERT INTO listing (title, picture, description, endtime, date, location,  portionremaining) VALUES ('${title}', '${picture}', '${description}', '${endtime}', '${date}', '${location}',  '${portionremaining}');`
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        return res.send(result);
    });
});


router.put("/", (req, res) => {
    const { id, title, picture, description, endtime, date, location, portionremaining } = req.body
    const query = `UPDATE listing SET title = '${title}', picture = '${picture}', description = '${description}',  endtime= '${endtime}', date = '${date}', location = '${location}',  portionremaining = '${portionremaining}' WHERE id = ${id};`
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        return res.send(result);
    });
});

router.delete("/", (req, res) => {
    const { id } = req.body
    const query = `DELETE FROM listing WHERE id = '${id}'`
    db.query(query, function (err, result, fields) {
        if (err) throw err;
        return res.send(result);
    });
});

module.exports = router;