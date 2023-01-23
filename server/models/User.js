const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    friends: [{
        type: String
    }], 
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    }
})

module.exports = new mongoose.model("User", UserSchema)