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
        ref: 'moneylendersinfos',
        required: true
    }
}, {
    timestamps: true
});