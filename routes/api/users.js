import express from "express";
import { signup, login, logout } from "../../controllers/users.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user).status(200);
    } else {
        res.status(401).send("Unauthorized");
    }
});

export default router;