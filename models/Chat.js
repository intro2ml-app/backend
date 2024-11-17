import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Chat = new Schema({
    updated_at: Date,
    id: Number,
    user_id: Number,
    created_at: Date
});

const ChatModel = mongoose.model('Chats', Chat);

export default ChatModel;