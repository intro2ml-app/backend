import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const ChatHistory = new Schema({
    chat_id: Object,
    model_id: Object,
    message: String,
    response: String,
    created_at: Date
});

const ChatHistoryModel = mongoose.model('ChatHistory', ChatHistory);

export default ChatHistoryModel;