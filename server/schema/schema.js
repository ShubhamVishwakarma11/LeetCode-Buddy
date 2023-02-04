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


// Type Definitions
const UserType = require('./type/UserType')
const InstituteType = require('./type/InstituteType')
const OtherUserType = require('./type/OtherUserType')

// Query Import
const InstitutesQuery = require('./query/InstitutesQuery')
const InstituteQuery = require('./query/InstituteQuery')
const UsersQuery = require('./query/UsersQuery')
const UserQuery = require('./query/UserQuery')
const FriendsQuery = require('./query/FriendsQuery')
const BatchmatesQuery = require('./query/BatchmatesQuery')

// Mutation Import
const AddUserMutation = require('./mutation/AddUserMutation')
const AddFriendMutation = require('./mutation/AddFriendMutation')
const AddInstituteMutation = require('./mutation/AddInstituteMutation')
const SetInstituteMutation = require('./mutation/SetInstituteMutation')

// Queries
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:  {
        institutes: InstitutesQuery,
        institute: InstituteQuery,
        users: UsersQuery,
        user: UserQuery,
        friends: FriendsQuery,
        batchmates: BatchmatesQuery,
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: AddUserMutation,
        addFriend: AddFriendMutation,
        addInstitute: AddInstituteMutation,
        setInstitute: SetInstituteMutation
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})