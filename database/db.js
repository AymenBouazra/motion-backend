const mongoose = require('mongoose');
const db_test = 'mongodb://localhost:27017/test';
const db_dev = 'mongodb+srv://motion:azerty123@mydatabase.8vzuo.mongodb.net/motion'
mongoose.connect(db_dev)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log(error);
    })