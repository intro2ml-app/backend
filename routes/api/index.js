import express from "express";
import chatsRoute from "./chats.js";
import modelsRoute from "./models.js";
import usersRoute from "./users.js";
import chatHistoriesRoute from "./chatHistories.js";

const router = express.Router();

router.use("/chats", chatsRoute);
router.use("/models", modelsRoute);
router.use("/users", usersRoute);
router.use("/chatHistories", chatHistoriesRoute);

export default router;