import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  user: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

// Define a simple Mongoose model
export const Message = model("Message", messageSchema);
