import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Chat = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    chat_name: {
        type: Schema.Types.String,
        required: true,
        default: ""
    },
    updated_at: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now
    },
    created_at: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now
    }
});

const ChatModel = mongoose.model('Chats', Chat);

export default ChatModel;