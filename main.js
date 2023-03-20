require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const listingRoutes = require('./routes/listings')
const app = express();
app.use(bodyParser.json())

app.use("/listings", listingRoutes)

app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`)
);
