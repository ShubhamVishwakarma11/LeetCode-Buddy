const {GraphQLID, GraphQLList, GraphQLString} = require('graphql')
const OtherUserType = require('../type/OtherUserType')
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


const FriendsQuery = {
    type: new GraphQLList(OtherUserType),
    args: {username: {type: GraphQLString}},
    resolve: async (parent, args) => {
        const dbUser = await User.findOne({username: args.username})
        const friends = dbUser.friends

        const friendsData = await friends.map( async friend =>  {
            const res = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
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
                profile: apiUser.matchedUser.profile,
                userContestRanking: apiUser.userContestRanking,
                recentAcSubmissionList: apiUser.recentAcSubmissionList
            }
            // console.log(user)
            return user
        })
        return friendsData
    }
}

module.exports = FriendsQuery