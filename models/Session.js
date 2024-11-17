import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Session = new Schema({
    id: Number,
    user_id: Number,
    session_token: String,
    ip_address: String,
    user_agent: String,
    created_at: Date,
    updated_at: Date
});

const SessionModel = mongoose.model('Sessions', Session);

export default SessionModel;