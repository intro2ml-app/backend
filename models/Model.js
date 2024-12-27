import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Model = new Schema({
    model_name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    service: {
        type: Schema.Types.String,
        required: true
    },
    input_limit: {
        type: Schema.Types.Number,
        required: true
    }, // tokens
    output_limit: {
        type: Schema.Types.Number,
        required: true
    }, // tokens 
    best_for: {
        type: Schema.Types.String,
        required: true
    },
    use_case: {
        type: Schema.Types.String,
        required: true
    },
    knowledge_cutoff: {
        type: Schema.Types.Date,
        required: true
    }, // tokens
    rate_limit: {
        type: Schema.Types.Number,
        required: true
    }, // tokens
});

const ModelModel = mongoose.model('Models', Model);

export default ModelModel;