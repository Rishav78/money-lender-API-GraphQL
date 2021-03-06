import mongoose, { Schema, HookNextFunction, Document } from 'mongoose';

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
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next: HookNextFunction) {
    const { email } = this as userDocument;
    const user: any = await this.model('users').findOne({ email });
    if (!!user) {
        throw new Error('user already exists');
    }
    next();
});

userSchema.pre('save', function(next: HookNextFunction) {
    const { email } = this as userDocument;
    console.log(`New user(${email}) added`);
    next();
});

export default mongoose.model('users', userSchema);