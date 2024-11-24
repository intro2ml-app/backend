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