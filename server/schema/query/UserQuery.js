const {GraphQLID} = require('graphql')
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
        }
        submitStats {
            acSubmissionNum {
                difficulty
                count
                submissions
            }
        }
    }
}`

const UserQuery = {
    type: UserType,
    args: {id: {type: GraphQLID}},
    resolve : async (parent,args) => {

        const dbUser = await User.findById(args.id)

        const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query,
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
    }}

module.exports = UserQuery