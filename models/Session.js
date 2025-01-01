import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Session = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    session_token: {
        type: Schema.Types.String,
        required: true
    },
    ip_address: {
        type: Schema.Types.String,
        required: true,
        default: ""
    },
    user_agent: {
        type: Schema.Types.String,
        required: true,
        default: ""
    },
    created_at: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now
    }
});

const SessionModel = mongoose.model('Sessions', Session);

export default SessionModel;