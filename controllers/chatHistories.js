import ChatHistoryModel from "../models/ChatHistory.js";
import ChatModel from "../models/Chat.js";
import ModelModel from "../models/Model.js";
import { generatingChatName } from "./chats.js";

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
        const model = await ModelModel.findOne({ _id: req.body.model_id });

        const response = await fetch("http://127.0.0.1:8000/query",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: req.body.message,
                    model: model.model_name,
                    temperature: 0.7,
                    top_p: 0.9,
                    max_tokens: 100,
                    stream: req.body.stream || false,
                })
            }
        );

        generatingChatName(req.body.chat_id, req.body.message);

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
        console.error("Error adding message");
        res.status(500).send("Error adding message");
    }
}

const deleteChat = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const chat = await ChatHistoryModel.deleteOne(query);
        res.json(chat).status(200);
    } catch (err) {
        console.error("Error deleting message");
        res.status(500).send("Error deleting message");
    }
}

export { getChats, getChat, addChat, deleteChat };