import mongoose, { Schema } from 'mongoose';

const loansSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userinfos',
        required: true
    },
    money: {
        type: Number,
        required: true,
    },
    moneylender: {
        type: Schema.Types.ObjectId,
        ref: 'userinfos',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('loans', loansSchema);