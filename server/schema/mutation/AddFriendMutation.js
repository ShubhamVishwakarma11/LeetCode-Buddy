const { GraphQLNonNull, GraphQLString } = require("graphql");
const User = require("../../models/User");
const UserType = require("../type/UserType");

const AddFriendMutation = {
    type: UserType,
    args: {
        userUsername: {type: new GraphQLNonNull(GraphQLString)},
        friendUsername: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        const findUser = await User.findOne({username: args.userUsername});
        const user = await User.findByIdAndUpdate(
            findUser.id,
            {
                $push: {
                    friends: args.friendUsername
                }
            },
            {new: true}
        )

        return user
    }
}


module.exports = AddFriendMutation