const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLSchema,
    GraphQLInputObjectType,
    GraphQLScalarType,
    GraphQLFloat
} = require('graphql') 
const Institute = require('../../models/Institute')
const InstituteType = require('./InstituteType')


// User Type

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        friends: {type: new GraphQLList(GraphQLString)},
        githubUrl: {type: GraphQLString},
        institute: {
            type: InstituteType,
            resolve(parent,args) {
                return Institute.findById(parent.instituteId)
            }
        },
        allQuestionsCount: {type: new GraphQLList( new GraphQLObjectType({
            name: "allQuestionsCount",
            fields : () => ({
                difficulty: {type: GraphQLString},
                count: {type: GraphQLInt}
            })
        }))},
        acSubmissionNum: {type: new GraphQLList( new GraphQLObjectType({
            name: "acSubmissionNum",
            fields : () => ({
                difficulty: {type: GraphQLString},
                count: {type: GraphQLInt},
                submissions: {type: GraphQLInt}
            })
        }))},
        profile: {type: new GraphQLObjectType({
            name: "profile",
            fields : () => ({
                realName: {type: GraphQLString},
                countryName: {type: GraphQLString},
                starRating: {type: GraphQLInt},
                aboutMe: {type: GraphQLString},
                userAvatar: {type: GraphQLString},               
                ranking: {type: GraphQLInt}
            })
        })},
        userContestRanking: {type: new GraphQLObjectType({
            name: "userContestRanking",
            fields : () => ({
                attendedContestsCount: {type: GraphQLInt},
                rating: {type: GraphQLFloat},
                topPercentage: {type: GraphQLFloat},
            })
        })},
        recentAcSubmissionList: {type: new GraphQLList( new GraphQLObjectType({
            name: "recentAcSubmissionList",
            fields : () => ({
                id: {type: GraphQLString},
                title: {type: GraphQLString},
                titleSlug: {type: GraphQLString},
                timestamp: {type: GraphQLString},
            })
        }))},
    })
})


module.exports = UserType