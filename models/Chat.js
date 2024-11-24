import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Chat = new Schema({
    user_id: Object,
    updated_at: Date,
    created_at: Date
});

const ChatModel = mongoose.model('Chats', Chat);

export default ChatModel;