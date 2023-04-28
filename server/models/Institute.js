const mongoose = require('mongoose')

const InstituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    students: [{
        type: String
    }],
    student_count: {
        type: Number
    }
})

module.exports = new mongoose.model("Institute", InstituteSchema)