import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const ChatHistory = new Schema({
    chat_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    model_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: Schema.Types.String,
        required: true,
        default: ""
    },
    response: {
        type: Schema.Types.String,
        required: true,
        default: ""
    },
    created_at: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now
    }
});

const ChatHistoryModel = mongoose.model('ChatHistory', ChatHistory);

export default ChatHistoryModel;