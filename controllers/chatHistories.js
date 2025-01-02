import ChatHistoryModel from "../models/ChatHistory.js";
import ChatModel from "../models/Chat.js";
import ModelModel from "../models/Model.js";
import { generatingChatName } from "./chats.js";

const getChats = async (req, res) => {
    try {
        const chatHistories = await ChatHistoryModel.find({ chat_id: req.params.chatId });
        res.json(chatHistories).status(200);
    }
    catch (err) {
        try {
            await ChatModel.findById(req.params.chatId);
            console.error("Error getting chat histories");
        }
        catch (err) {
            console.error("Chat doesn't exist");
            res.status(404).send("Invalid chat ID");
        }
    }
}

const addChat = async (req, res) => {
    try {
        const model = await ModelModel.findOne({ _id: req.body.model_id });

        const stream = req.body.stream || false;
        const msg = req.body.message;
        if (Array.isArray(msg)) {
            req.body.message = msg.join(" ");
        }
        const response = await fetch("http://192.168.0.41:8000/query",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: req.body.message,
                    model: model.model_name,
                    stream: stream,
                })
            }
        );

        generatingChatName(req.body.chat_id, req.body.message);

        if (stream) {
            res.setHeader('Content-Type', 'text/plain');
            let fullResponse = "";
            // Stream the response as it arrives
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullResponse += chunk;
                // Send chunk to the client
                res.write(chunk);
            }
            res.end();
            // Save the complete response after streaming
            const newChat = new ChatHistoryModel({
                chat_id: req.body.chat_id,
                model_id: req.body.model_id,
                message: req.body.message,
                response: fullResponse,
                created_at: new Date(),
            });
            await ChatModel.updateOne({ _id: req.body.chat_id }, { updated_at: new Date() });
            await newChat.save();
        } else {
            const responseData = await response.json();
            const newChat = new ChatHistoryModel({
                chat_id: req.body.chat_id,
                model_id: req.body.model_id,
                message: req.body.message,
                response: responseData.response,
                created_at: new Date(),
            });
            await ChatModel.updateOne({ _id: req.body.chat_id }, { updated_at: new Date() });
            const chat = await newChat.save();
            res.json(chat).status(201);
        }
    } catch (err) {
        console.log(err);
        
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

export { getChats, addChat, deleteChat };