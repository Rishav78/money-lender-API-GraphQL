import mongoose, {Schema} from 'mongoose';

const moneyLenderInfoSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        required: true,
        default: 0,
    },
    loans: [{
        type: Schema.Types.ObjectId,
        ref: 'loans'
    }],
}, {
    timestamps: true
});

export default mongoose.model('moneylendersinfos', moneyLenderInfoSchema);