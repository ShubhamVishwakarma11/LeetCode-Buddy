const { 
    GraphQLObjectType, 
    GraphQLID,
    GraphQLInt,
    GraphQLString, 
    GraphQLList,
    GraphQLFloat
} = require('graphql') 


// Other User Type

const OtherUserType = new GraphQLObjectType({
    name: "OtherUser",
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        githubUrl: {type: GraphQLString},
        allQuestionsCount: {type: new GraphQLList( new GraphQLObjectType({
            name: "otherUserallQuestionsCount",
            fields : () => ({
                difficulty: {type: GraphQLString},
                count: {type: GraphQLInt}
            })
        }))},
        acSubmissionNum: {type: new GraphQLList( new GraphQLObjectType({
            name: "otherUseracSubmissionNum",
            fields : () => ({
                difficulty: {type: GraphQLString},
                count: {type: GraphQLInt},
                submissions: {type: GraphQLInt}
            })
        }))},
        profile: {type: new GraphQLObjectType({
            name: "otherUserprofile",
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
            name: "otherUseruserContestRanking",
            fields : () => ({
                attendedContestsCount: {type: GraphQLInt},
                rating: {type: GraphQLFloat},
                topPercentage: {type: GraphQLFloat},
            })
        })},
        recentAcSubmissionList: {type: new GraphQLList( new GraphQLObjectType({
            name: "otherUserrecentAcSubmissionList",
            fields : () => ({
                id: {type: GraphQLString},
                title: {type: GraphQLString},
                titleSlug: {type: GraphQLString},
                timestamp: {type: GraphQLString},
            })
        }))},
    })
})


module.exports = OtherUserType