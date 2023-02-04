const { GraphQLNonNull, GraphQLString } = require("graphql")
const UserType = require("../type/UserType")
const User = require('../../models/User')

const AddUserMutation = {
    type: UserType,
    args: {
        username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        const user = await User.create({
            username: args.username,
            friends: []
        })

        return user
    }
}

module.exports = AddUserMutation 