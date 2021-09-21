const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/mongodb-demo'


mongoose.connect(url)
    .then(() => console.log("connected to db"))
    .catch((err) => console.error("failed to connect", err))