import express from "express";
import { signup, login, logout } from "../../controllers/users.js";

const router = express.Router();

router.get("/register", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;