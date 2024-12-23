import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Model = new Schema({
    model_name: {
        type: String,
        required: true,
        unique: true
    },
    service: String,
    input_limit: Number, // tokens
    output_limit: Number, // tokens
    best_for: String,
    use_case: String,
    knowledge_cutoff: Date,
    rate_limit: Number, // RPM
});

const ModelModel = mongoose.model('Models', Model);

export default ModelModel;