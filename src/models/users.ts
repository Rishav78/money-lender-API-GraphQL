import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new Schema({

});

export default mongoose.model('users', userSchema);