// NPM Packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");

// Server Configuration
const app = express();

app.use(cors());
app.use(express.json());

// Variables
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL

// Route Requirements
const userRoutes = require("./router/user.route");
const messageRoutes = require("./router/message.route");

// Routes
app.use("/api/auth/", userRoutes);
app.use("/api/message", messageRoutes);

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

const io = socket(server, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true
	}
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
	global.chatSocket= socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);

		console.log(data)

		if(sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-recieve", data.message);
		}
	})
})