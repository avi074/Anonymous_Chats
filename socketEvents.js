import { Message } from "./model/message.model.js";

/**
 * Create events on socket server
 * @param {import('socket.io').Server} io 
 */
export function getSocketEvents(io) {
  // Handle socket.io connections
  io.on("connection", (socket) => {
    console.log("\nA user connected with id:", socket.id);

    socket.emit("newUser", `user-${socket.id}`);

    // Listen for new messages
    socket.on("sendMessage", async (msg) => {
      console.log("Message received: ", msg);

      const data = {
        user: `user-${socket.id}`,
        message: msg,
        timestamp: Date.now(),
      };
      // Save the message to MongoDB
      const message = new Message(data);
      await message.save();

      // Broadcast the message to all clients
      io.emit("newMessage", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected with id:", socket.id);
    });
  });
}
