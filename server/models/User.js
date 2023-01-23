const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    friends: [{
        type: String
    }], 
    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institute'
    }
})

module.exports = new mongoose.model("User", UserSchema)