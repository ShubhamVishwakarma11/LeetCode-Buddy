const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLSchema
} = require('graphql')

// Models
const User = require('../models/User')
const Institute = require('../models/Institute')


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

// User Type

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        friends: {type: new GraphQLList(GraphQLString)},
        institute: {
            type: InstituteType,
            resolve(parent,args) {
                return Institute.findById(parent.instituteId)
            }
        }
    })
})

// Queries

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:  {
        institutes: {
            type: new GraphQLList(InstituteType),
            resolve(parent, args) {
                return Institute.find()
            }
        },
        institute: {
            type: InstituteType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return Institute.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find()
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return User.findById(args.id)
            }
        }
    }
})

// Mutations

const mutation = new GraphQLObjectType({
    name: "Mutation"
})


module.exports = new GraphQLSchema({
    query: RootQuery
})