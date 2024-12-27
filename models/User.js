import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const User = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    password_hash: {
        type: Schema.Types.String,
        required: true
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

const UserModel = mongoose.model('Users', User);

export default UserModel;