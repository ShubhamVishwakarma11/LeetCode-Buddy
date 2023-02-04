const {GraphQLList} = require('graphql')
const UserType = require('../type/UserType')
const User = require('../../models/User')

const UsersQuery = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find()
    }
}

module.exports = UsersQuery