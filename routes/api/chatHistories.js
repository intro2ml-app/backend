import express from "express";
import ChatHistoryModel from "../../models/ChatHistory.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    const chatHistories = await ChatHistoryModel.find();
    res.json(chatHistories).status(200);
});

router.get("/:id", async (req, res) => {
    const chatHistory = await ChatHistoryModel.find({ id: ObjectId(req.params.id) });
    if (!chatHistory) res.send("Not found").status(404);
    else res.json(chatHistory).status(200);
});

router.post("/", async (req, res) => {
    try {
        const newChatHistory = new ChatHistoryModel({
            id: req.body.id,
            messages: req.body.messages,
        });
        const chatHistory = await newChatHistory.save();
        res.json(chatHistory).status(201);
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

        const chatHistory = await ChatHistoryModel.updateOne(query, updates);
        res.json(chatHistory).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId(req.params.id) };
        const chatHistory = await ChatHistoryModel.deleteOne(query);
        res.json(chatHistory).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;