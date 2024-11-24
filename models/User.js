import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const User = new Schema({
    username: String,
    email: String,
    password_hash: String,
    created_at: Date,
    updated_at: Date
});

const UserModel = mongoose.model('Users', User);

export default UserModel;