import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import UserModel from "../models/User";
import SessionModel from "../models/Session";

passport.use(
    new LocalStrategy(
        { usernameField: "username", passwordField: "password" },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ username });
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    return done(null, false, { message: "Invalid password" });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser(async (user, done) => {
    try {
        const sessionToken = crypto.getRandomValues(new Uint32Array(4)).join("-");
        
        const session = await SessionModel.create({
            user_id: user.id,
            session_token: sessionToken,
            ip_address: "",
            user_agent: "",
            created_at: new Date(),
            updated_at: new Date(),
        });

        done(null, session.session_token);
    } catch (err) {
        done(err);
    }
});

passport.deserializeUser(async (id, done) => {
    try {
        const session = await SessionModel.findOne({ session_token: sessionToken });
        if (!session) {
            return done(new Error("Session not found"));
        }

        const user = await UserModel.findById(session.user_id);
        if (!user) {
            return done(new Error("User not found"));
        }

        done(null, user);
    } catch (err) {
        done(err);
    }
});