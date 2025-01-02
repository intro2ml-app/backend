import express from "express";
import ChatModel from "../../models/Chat.js";
import UserModel from "../../models/User.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const chats = await ChatModel.find({ user_id: req.params.userId });
        res.json(chats).status(200);
    } catch (err) {
        try {
            await UserModel.findById(req.params.userId);
            console.error("Error getting chats");
        }
        catch (err) {
            console.error("User not found");
            res.status(404).send("Invalid user ID");
        }
    }
});

router.post("/", async (req, res) => {
    try {
        const newChat = new ChatModel({
            user_id: req.body.user_id,
            updated_at: new Date(),
            created_at: new Date()
        });

        await newChat.save();
        res.json(newChat).status(201);
    } catch (err) {
        console.error("Error adding chat");
        res.status(500).send("Error adding chat");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const chat = await ChatModel.deleteOne(query);
        res.json(chat).status(200);
    } catch (err) {
        console.error("Error deleting chat");
        res.status(500).send("Error deleting chat");
    }
});

export default router;