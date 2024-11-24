import express from "express";
import ChatModel from "../../models/Chat";

const router = express.Router();

router.get("/", async (req, res) => {
    const chats = await ChatModel.find();
    res.json(chats).status(200);
});

router.get("/:id", async (req, res) => {
    const chat = await ChatModel.find({ user_id: req.params.id });
    if (!chat) res.send("Not found").status(404);
    else res.json(chat).status(200);
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
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const chat = await ChatModel.deleteOne(query);
        res.json(chat).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;