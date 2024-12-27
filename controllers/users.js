import bcrypt from "bcryptjs";
import passport from "../middleware/auth.js";
import UserModel from "../models/User.js";
import Session from "../models/Session.js";

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new UserModel({
            username,
            email,
            password_hash: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
        });

        await user.save();
        res.status(200).json({ message: "Signup successful", user });
    } catch (err) {
        console.error("Error signing up");
        res.status(500).send("Error signing up");
    }
};

const login = (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send(info.message);
        }

        req.logIn(user, async (err) => {
            if (err) {
                return next(err);
            }

            const ipAddress = req.ip;
            const userAgent = req.headers["user-agent"];

            await Session.updateOne(
                { user_id: user.id },
                { ip_address: ipAddress, user_agent: userAgent, updated_at: new Date() },
                { upsert: true }
            );

            res.status(200).json({ message: "Login successful", user });
        });
    })(req, res, next);
};

const logout = async (req, res) => {
    try {
        const sessionToken = req.session.passport.user;

        await Session.deleteOne({ session_token: sessionToken });

        req.logout((err) => {
            if (err) {
                return res.status(500).send("Error logging out");
            }
            res.status(200).send("Logged out");
        });
    } catch (err) {
        console.error("Error logging out");
        res.status(500).send("Error logging out");
    }
};

export { signup, login, logout };