import ChatModel from "../models/Chat";
import ChatHistoryModel from "../models/ChatHistory";

const getChats = async (req, res) => {
    try {
        const chats = await ChatModel.find();
        res.json(chats).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching chats");
    }
};

const getChat = async (req, res) => {
    try {
        const chat = await ChatModel.find({ user_id: req.params.id });
        if (!chat) res.send("Not found").status(404);
        else res.json(chat).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching chat");
    }
};

const addChat = async (req, res) => {
    try {
        const newChat = new ChatModel({
            user_id: req.body.user_id,
            updated_at: new Date(),
            created_at: new Date()
        });

        const newChatHistory = new ChatHistoryModel({
            user_id: req.body.user_id,
            model_id: req.body.model_id,
            message: req.body.message,
            response: "",
            created_at: new Date()
        });

        await newChat.save();
        const chatHistory = await newChatHistory.save();

        res.json(chatHistory).status(201);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
};

const deleteChat = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const chat = await ChatModel.deleteOne(query);
        res.json(chat).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
};

export { getChats, getChat, addChat, deleteChat };