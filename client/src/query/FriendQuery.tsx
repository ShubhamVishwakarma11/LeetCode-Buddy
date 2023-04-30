import { gql } from "@apollo/client";

export const GET_FRIENDS_LIST = gql`
    query getFriends($username: String!) {
        friends(username: $username) {
            username
            githubUrl
            acSubmissionNum {
              difficulty
              count
            }
            allQuestionsCount{
              difficulty
              count
            }
            userContestRanking {
              attendedContestsCount
              rating
              topPercentage
            }
            profile {
              realName
              ranking
              userAvatar
            }
            
        }
    }
`;