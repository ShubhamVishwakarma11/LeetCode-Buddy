const mongoose = require('mongoose')

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    studentsCount: {
        type: Number
    }
})

module.exports = new mongoose.model("College", CollegeSchema)