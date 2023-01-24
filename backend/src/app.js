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

// Route Requirements
const userRoutes = require("./router/user.route");

// Routes
app.use("/api/auth/", userRoutes);

// Mongoose Connection
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