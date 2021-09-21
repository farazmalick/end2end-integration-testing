const { string } = require('joi')
const mongoose = require('mongoose')


const coursesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    author: {
        type: String
    }

})


const Courses = mongoose.model('Courses',coursesSchema)

module.exports = Courses