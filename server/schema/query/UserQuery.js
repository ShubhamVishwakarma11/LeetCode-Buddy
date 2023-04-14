const {GraphQLString} = require('graphql')
const UserType = require('../type/UserType')
const User = require('../../models/User')

const query = `query getUserProfile($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }
    matchedUser(username: $username) {
        username
        githubUrl
        profile {
            realName
            countryName
            starRating
            aboutMe
            userAvatar
            ranking
        }
        submitStats {
            acSubmissionNum {
                difficulty
                count
                submissions
            }
        }
    }
    userContestRanking(username: $username) {
        attendedContestsCount
        rating
        topPercentage
    }
    recentAcSubmissionList(username: $username, limit: 11) {
        id
        title
        titleSlug
        timestamp
    }
}`

const UserQuery = {
    type: UserType,
    args: {username: {type: GraphQLString}},
    resolve : async (parent,args) => {

        const dbUser = await User.findOne({username: args.username})

        const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query,
            variables: {
                username: args.username
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
            profile: apiUser.matchedUser.profile,
            userContestRanking: apiUser.userContestRanking,
            recentAcSubmissionList: apiUser.recentAcSubmissionList
        }

        return user
    }}

module.exports = UserQuery