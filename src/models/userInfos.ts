import mongoose, {Schema} from 'mongoose';

const userInfoSchema: Schema = new Schema({
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
    loans: [{
        type: Schema.Types.ObjectId,
        ref: 'loans'
    }],
},{
    timestamps: true
});

export default mongoose.model('userinfos', userInfoSchema);