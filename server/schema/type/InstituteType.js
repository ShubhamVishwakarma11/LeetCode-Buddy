const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLSchema
} = require('graphql')


// Institute Type 

const InstituteType = new GraphQLObjectType({
    name: "Institute",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        city: {type: GraphQLString},
        student_count: {type: GraphQLInt}
    })
})

module.exports = InstituteType