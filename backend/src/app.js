// NPM Packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Server Configuration
const app = express();

app.use(cors());
app.use(express.json());

// Variables
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL

mongoose
	.connect(DB_URL, {
		useNewURLParser: true,
	})
	.then(() => {
		console.log("Database connection successful");
	})
	.catch((err) => {
		console.log(err.message);
	});

	

// Server
const server = app.listen(PORT, () => {
	console.log(`Server is on ${PORT}`);
});