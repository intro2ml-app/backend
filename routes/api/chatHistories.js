import express from "express";
import { addChat, deleteChat, getChats } from "../../controllers/chatHistories.js";

const router = express.Router();

router.get("/:chatId", getChats);
router.post("/", addChat);
router.delete("/:id", deleteChat);

export default router;