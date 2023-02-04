const {GraphQLID, GraphQLList} = require('graphql')
const OtherUserType = require('../type/OtherUserType')
const User = require('../../models/User')
const Institute = require('../../models/Institute')


const query = `query getUserProfile($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }
    matchedUser(username: $username) {
        username
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

const BatchmatesQuery = {
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
                profile: apiUser.matchedUser.profile
            }
            console.log(user)
            return user
        })
        return batchmatesData
    }
}

module.exports = BatchmatesQuery