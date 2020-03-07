import mongoose from 'mongoose';

mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB}`, 
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', (err) => {
    throw err;
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected')
});