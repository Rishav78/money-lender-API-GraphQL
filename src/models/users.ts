import mongoose, { Schema, HookNextFunction } from 'mongoose';

export type userDocument = mongoose.Document & {
    email: String,
    password: String
};

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'please provide a valid email'
        ],
    },
    password: {
        type: String,
        required: true,
        match: [
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?])[a-zA-z0-9!?]{8,}/,
            'password should be of minimum 8 length and must contain special character(?!)'
        ]
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next: HookNextFunction) {
    const { email } = this as userDocument;
    console.log(`New user(${email}) added`);
    next();
});

export default mongoose.model('users', userSchema);