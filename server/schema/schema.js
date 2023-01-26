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

const UserType = require('./type/UserType')
const InstituteType = require('./type/InstituteType')


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
            resolve : async (parent,args) => {

                const dbUser = await User.findById(args.id)

                const res = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                body: JSON.stringify({
                    query: `query getUserProfile($username: String!) {
                        allQuestionsCount {
                            difficulty
                            count
                        }
                        matchedUser(username: $username) {
                            username
                            githubUrl
                            contributions {
                                points
                                questionCount
                                testcaseCount
                            }
                            profile {
                                realName
                                websites
                                countryName
                                skillTags
                                company
                                school
                                starRating
                                aboutMe
                                userAvatar
                                reputation
                                ranking
                            }
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                                totalSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                            badges {
                                id
                                displayName
                                icon
                                creationDate
                            }
                        }
                    }`,
                    variables: {
                        username: dbUser.username
                    }
                }),
                headers: {
                    'content-type': 'application/json'
                }
                })
                
                const data = await res.json()
                

                console.log(data.data)
                console.log(data.error)
       

                const apiUser = data.data

                const user = {
                    id: dbUser.id,
                    username: dbUser.username,
                    instituteId: dbUser.instituteId ,
                    friends: dbUser.friends,
                    githubUrl: apiUser.matchedUser.githubUrl,
                    allQuestionsCount: apiUser.allQuestionsCount,
                    acSubmissionNum: apiUser.matchedUser.submitStats.acSubmissionNum,
                    profile: apiUser.matchedUser.profile
                }

                return user
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