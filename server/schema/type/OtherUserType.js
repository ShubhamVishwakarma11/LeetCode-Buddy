const { 
    GraphQLObjectType, 
    GraphQLID,
    GraphQLInt,
    GraphQLString, 
    GraphQLList
} = require('graphql') 


// Other User Type

const OtherUserType = new GraphQLObjectType({
    name: "OtherUser",
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        githubUrl: {type: GraphQLString},
        allQuestionsCount: {type: new GraphQLList( new GraphQLObjectType({
            name: "otherUserAllQuestionsCount",
            fields : () => ({
                difficulty: {type: GraphQLString},
                count: {type: GraphQLInt}
            })
        }))},
        acSubmissionNum: {type: new GraphQLList( new GraphQLObjectType({
            name: "otherUserAcSubmissionNum",
            fields : () => ({
                difficulty: {type: GraphQLString},
                count: {type: GraphQLInt},
                submissions: {type: GraphQLInt}
            })
        }))},
        profile: {type: new GraphQLObjectType({
            name: "otherUserProfile",
            fields : () => ({
                realName: {type: GraphQLString},
                countryName: {type: GraphQLString},
                starRating: {type: GraphQLInt},
                aboutMe: {type: GraphQLString},
                userAvatar: {type: GraphQLString},              
                                
            })
        })},
    })
})


module.exports = OtherUserType