import mongoose, { Schema, Document, HookNextFunction } from 'mongoose';
import slugify from 'slugify';

export type userInfoDocument = Document & {
    "email": string,
    "firstname": string,
    "lastname": string,
    "money"?: number,
    "role": string,
    "loans": string[],
    "image": string,
};

const userInfoSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'please provide a valid email'
        ]
    },
    firstname: {
        type: String,
        required: [true, 'firstname missing'],
    },
    lastname: {
        type: String,
        required: [true, 'lastname missing'],
    },
    money: {
        type: Number,
        required: function() {
            const { role } = this as any;
            return role === 'moneylender';
        },
        min: [0, 'money must be greater or equal to 0']
    },
    role: {
        type: String,
        required: [true, "montion your role"],
        enum: ['user', 'moneylender'],
        default: 'user'
    },
    loans: [{
        type: Schema.Types.ObjectId,
        ref: 'loans',
        default: []
    }],
    image: {
        type: String,
        default: 'default.png'
    }
},{
    timestamps: true
});

userInfoSchema.pre('save', function(next: HookNextFunction) {
    const { role, money }  = this as userInfoDocument;
    if (role === 'user') {
        (this as userInfoDocument).money = undefined;
    }
    next();
});

userInfoSchema.pre('save', function(next: HookNextFunction){
    const { firstname, lastname } = this as userInfoDocument;
    (this as userInfoDocument).firstname = slugify(firstname, { lower: true });
    (this as userInfoDocument).lastname = slugify(lastname, { lower: true });
    next();
});

userInfoSchema.pre('save', function(next: HookNextFunction) {
    const { email } = this as userInfoDocument;
    console.log(`user(${email}) information added`);
    next();
});

export default mongoose.model('userinfos', userInfoSchema);