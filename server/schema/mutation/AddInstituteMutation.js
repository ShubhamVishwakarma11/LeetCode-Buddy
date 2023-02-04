const { GraphQLNonNull, GraphQLString } = require("graphql");
const InstituteType = require("../type/InstituteType");
const Institute = require('../../models/Institute')

const AddInstituteMutation = {
    type: InstituteType,
    args: {
        name:{type: new GraphQLNonNull(GraphQLString)} ,
        city: { type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        const institute = await Institute.create({
            name: args.name,
            city: args.city,
            students: [],
            student_count: 0
        })

        return institute
    }
}


module.exports = AddInstituteMutation