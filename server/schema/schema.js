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

//Query Import
const InstitutesQuery = require('./query/InstitutesQuery')
const InstituteQuery = require('./query/InstituteQuery')
const UsersQuery = require('./query/UsersQuery')

// Queries
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:  {
        institutes: InstitutesQuery,
        institute: InstituteQuery,
        users: UsersQuery,
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
            }},
            friends: {
                type: new GraphQLList(OtherUserType),
                args: {id: {type: GraphQLID}},
                resolve: async (parent, args) => {
                    const dbUser = await User.findById(args.id)
                    const friends = dbUser.friends

                    // let friendsData = [null]

                    const friendsData = await friends.map( async friend =>  {
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
                                username: friend
                            }
                        }),
                        headers: {
                            'content-type': 'application/json'
                        }
                        })
                        const data = await res.json()

                        const apiUser = data.data

                        const user = {
                            id: dbUser.id,
                            username: friend,
                            githubUrl: apiUser.matchedUser.githubUrl,
                            allQuestionsCount: apiUser.allQuestionsCount,
                            acSubmissionNum: apiUser.matchedUser.submitStats.acSubmissionNum,
                            profile: apiUser.matchedUser.profile
                        }
                        // console.log(user)
                        return user
                    })
                    return friendsData
                }
            },
            batchmates: {
                type: new GraphQLList(OtherUserType),
                args: {id: {type: GraphQLID}},
                resolve: async (parent,args) => {
                    const dbUser = await User.findById(args.id)
                    const instituteId = dbUser.instituteId

                    const institute = await Institute.findById(instituteId)

                    const batchmatesData = await institute.students.map( async friend =>  {
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
                                username: friend
                            }
                        }),
                        headers: {
                            'content-type': 'application/json'
                        }
                        })
                        const data = await res.json()

                        const apiUser = data.data

                        const user = {
                            id: dbUser.id,
                            username: friend,
                            githubUrl: apiUser.matchedUser.githubUrl,
                            allQuestionsCount: apiUser.allQuestionsCount,
                            acSubmissionNum: apiUser.matchedUser.submitStats.acSubmissionNum,
                            profile: apiUser.matchedUser.profile
                        }
                        console.log(user)
                        return user
                    })
                    return batchmatesData
                }
            },
    }
})

// Mutations

const mutation = new GraphQLObjectType({
    name: "Mutation"
})


module.exports = new GraphQLSchema({
    query: RootQuery
})