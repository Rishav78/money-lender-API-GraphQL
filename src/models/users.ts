import mongoose, { Schema } from 'mongoose';

export type userDocument = mongoose.Document & {
    email: String,
    password: String
};

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('users', userSchema);