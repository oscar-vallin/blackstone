const mongoose = require('mongoose');
const keys = require('../config/keys');

module.exports= async () => {
    await mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, console.log("success"))};
