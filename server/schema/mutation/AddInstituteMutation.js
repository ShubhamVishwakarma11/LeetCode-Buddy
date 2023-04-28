const { GraphQLNonNull, GraphQLString } = require("graphql");
const InstituteType = require("../type/InstituteType");
const Institute = require('../../models/Institute');
const User = require("../../models/User");

const AddInstituteMutation = {
    type: InstituteType,
    args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        name:{type: new GraphQLNonNull(GraphQLString)} ,
        city: { type: new GraphQLNonNull(GraphQLString)},
        logo: {type: GraphQLString}
    },
    resolve: async (parent, args) => {
        const institute = await Institute.create({
            name: args.name,
            city: args.city,
            students: [`${args.username}`],
            student_count: 1,
            logo: args.logo
        })
        const findUser = await User.findOne({username: args.username});
        const user = await User.findByIdAndUpdate(
            findUser._id,
            {
                $set: {
                    instituteId: institute.id
                }
            },
            {new: true}    
        )

        return institute
    }
}


module.exports = AddInstituteMutation