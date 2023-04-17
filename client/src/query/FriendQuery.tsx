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
            profile {
              realName
              ranking
              userAvatar
            }
            
        }
    }
`;