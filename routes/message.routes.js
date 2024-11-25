import { Router } from "express";
import {Message} from "../model/message.model.js"

const chatRouter = Router();

// Serve the previous messages
chatRouter.get("/previousChats", async (req, res) => {
    try {
      const messages = await Message.find().sort({ timestamp: 1 }).exec();
      res.json(messages); // Send the chat history
    } catch (err) {
      res.status(500).send("Error retrieving messages");
    }
  });

export default chatRouter;
