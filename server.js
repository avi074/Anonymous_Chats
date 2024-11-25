import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getSocketEvents } from "./socketEvents.js";
import { connectDB } from "./config/db.js";
import chatRouter from "./routes/message.routes.js";

// Initialize Express app and HTTP server
const app = express();

app.use(express.json())
app.use(express.static("public"));
app.use('/api', chatRouter);

connectDB()

// Create an http server
const server = http.createServer(app);

// Initialize socket.io with the server
const io = new Server(server);
getSocketEvents(io);

// Start the server on a specified port
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

