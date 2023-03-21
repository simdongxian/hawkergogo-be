const express = require('express')
const router = express.Router();
const db = require('../database/db')

router.get("/", (req, res) => {
    db.query("SELECT * FROM cart", function (err, result, fields) {
        if (err) throw err;
        return res.send(result);
    });
});

router.post("/", (req, res) => {
    const { listing_id, portion } = req.body
    const query = `INSERT INTO cart (listing_id, portion) VALUES (${listing_id}, ${portion}) ON DUPLICATE KEY UPDATE portion = ${portion};`
    db.query(query, function (err, result, fields) {
        if (err) throw err;
    });
    db.query("SELECT * FROM cart", function (err, result, fields) {
        if (err) throw err;
        return res.send(result);
    });
});


// router.put("/", (req, res) => {
//     const { id, title, picture, description, starttime, endtime, location, portionremaining } = req.body
//     const query = `UPDATE listing SET title = '${title}', picture = '${picture}', description = '${description}',  starttime = '${starttime}', endtime= '${endtime}', location = '${location}',  portionremaining = '${portionremaining}' WHERE id = ${id};`
//     db.query(query, function (err, result, fields) {
//         if (err) throw err;
//         return res.send(result);
//     });
// });

router.delete("/", (req, res) => {
    const { id } = req.body
    const query = `DELETE FROM cart WHERE listing_id = '${listing_id}'`
    db.query(query, function (err, result, fields) {
        if (err) throw err;
    });
    db.query("SELECT * FROM cart", function (err, result, fields) {
        if (err) throw err;
        return res.send(result);
    });
});

module.exports = router;