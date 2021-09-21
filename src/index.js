require('./db/mongoose')
const express = require('express')
const courseRouter = require('./routes/coureses')

const app = express();

app.use(express.json())

//routes
app.use(courseRouter)


const PORT = 5000;

const server = app.listen(PORT, () => {
    console.log(`listinig on PORT ${PORT}`)
})


module.exports = server;