import express from "express";
import { signup, login, logout } from "../../controllers/users.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", (req, res) => {
    res.send(req.user);
});

export default router;