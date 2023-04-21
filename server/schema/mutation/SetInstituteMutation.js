const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql");
const UserType = require("../type/UserType");
const User = require('../../models/User');
const Institute = require("../../models/Institute");

const SetInstituteMutation = {
    type: UserType,
    args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        instituteId: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: async (parent, args) => {
        const findUser = await User.findOne({username: args.username});
        const user = await User.findByIdAndUpdate(
            findUser._id,
            {
                $set: {
                    instituteId: args.instituteId
                }
            },
            {new: true}    
        )
        const institute = await Institute.findByIdAndUpdate(
            args.instituteId,
            {
                $push: {
                    students: args.username
                },
                $inc: {
                    student_count : 1
                }
            },
            {new: true}
        )
        

        return user
    }
}

module.exports = SetInstituteMutation

