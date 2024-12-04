import ChatHistoryModel from "../models/ChatHistory.js";
import ChatModel from "../models/Chat.js";
import { query } from "express";

const getChats = async (req, res) => {
    const chatHistories = await ChatHistoryModel.find({ chat_id: req.params.chatId });
    res.json(chatHistories).status(200);
}

const getChat = async (req, res) => {
    const chatHistory = await ChatHistoryModel.find({ _id: req.params.id });
    if (!chatHistory) res.send("Not found").status(404);
    else res.json(chatHistory).status(200);
}

const addChat = async (req, res) => {
    try {
        const response = fetch("http://127.0.0.1:8000/query",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: req.body.message })
            }
        );

        const newChat = new ChatHistoryModel({
            chat_id: req.body.chat_id,
            model_id: req.body.model_id,
            message: req.body.message,
            response: response,
            created_at: new Date()
        });

        await ChatModel.updateOne({ _id: req.body.chat_id }, { updated_at: new Date() });
        const chat = await newChat.save();
        res.json(chat).status(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
}

const deleteChat = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const chat = await ChatHistoryModel.deleteOne(query);
        res.json(chat).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
}

export { getChats, getChat, addChat, deleteChat };