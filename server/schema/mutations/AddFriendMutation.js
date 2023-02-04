const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql");
const User = require("../../models/User");
const UserType = require("../type/UserType");

const AddFriendMutation = {
    type: UserType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        const user = await User.findByIdAndUpdate(
            args.id,
            {
                $push: {
                    friends: args.username
                }
            },
            {new: true}
        )

        return user
    }
}


module.exports = AddFriendMutation