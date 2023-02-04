const { GraphQLNonNull, GraphQLID } = require("graphql");
const UserType = require("../type/UserType");
const User = require('../../models/User')

const SetInstituteMutation = {
    type: UserType,
    args: {
        userId: {type: new GraphQLNonNull(GraphQLID)},
        instituteId: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: async (parent, args) => {
        const user = await User.findByIdAndUpdate(
            args.userId,
            {
                $set: {
                    instituteId: args.instituteId
                }
            },
            {new: true}    
        )

        return user
    }
}

module.exports = SetInstituteMutation

