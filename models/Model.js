import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Model = new Schema({
    model_name: String,
    description: String,
});

const ModelModel = mongoose.model('Models', Model);

export default ModelModel;