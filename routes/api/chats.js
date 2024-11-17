import express from "express";
import ChatModel from "../../models/Chat.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    const chats = await ChatModel.find();
    res.json(chats).status(200);
});

router.get("/:id", async (req, res) => {
    const chat = await ChatModel.find({ users: ObjectId(req.params.id) });
    if (!chat) res.send("Not found").status(404);
    else res.json(chat).status(200);
});

router.post("/", async (req, res) => {
    try {
        const newChat = new ChatModel({
            users: req.body.users,
            messages: req.body.messages,
        });
        const chat = await newChat.save();
        res.json(chat).status(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId(req.params.id) };
        const updates = {
            $set: {
                users: req.body.users,
                messages: req.body.messages,
            },
        };

        const chat = await ChatModel.updateOne(query, updates);
        res.json(chat).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId(req.params.id) };
        const chat = await ChatModel.deleteOne(query);
        res.json(chat).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;