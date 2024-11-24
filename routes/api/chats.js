import express from "express";
import { addChat, deleteChat, getChat, getChats } from "../../controllers/chats.js";

const router = express.Router();

router.get("/", getChats);
router.get("/:id", getChat);
router.post("/", addChat);
router.delete("/:id", deleteChat);

export default router;