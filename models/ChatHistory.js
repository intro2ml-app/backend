import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const ChatHistory = new Schema({
    id: Number,
    chat_id: Number,
    model_id: Number,
    message: String,
    response: String,
    created_at: Date
});

const ChatHistoryModel = mongoose.model('ChatHistory', ChatHistory);

export default ChatHistoryModel;