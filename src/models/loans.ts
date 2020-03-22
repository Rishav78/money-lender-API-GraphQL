import mongoose, { Schema, HookNextFunction, Document } from 'mongoose';

type LoanDocument = Document & {
    "user": string,
    "money": number,
    "moneylender": string
};

const loansSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userinfos',
        required: true
    },
    money: {
        type: Number,
        required: true,
        min: [100, "Requested money need be positive and greater then 100"]
    },
    moneylender: {
        type: Schema.Types.ObjectId,
        ref: 'userinfos',
        required: true
    }
}, {
    timestamps: true
});

loansSchema.pre('save', async function(next: HookNextFunction) {
    const { moneylender, money }  = this as LoanDocument;
    const lender: any = await this.model('userinfos').findById(moneylender);
    const { money: lendermoney } = lender;
    if( lendermoney - money < 0 ) {
        throw new Error('not enough money');
    }
    next();
});

loansSchema.pre('save', async function(next: HookNextFunction) {
    const { user, moneylender, money } = this as any;
    console.log(`user with id ${user} take loan of ${money} from moneylender having id ${moneylender}`);
    next();
});

export default mongoose.model('loans', loansSchema);