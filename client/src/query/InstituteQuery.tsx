import { gql } from "@apollo/client";

export const GET_INSTITUTES_LIST = gql`
    query getInstitutes {
        institutes{
            id
            name
            city
            student_count
            students
            logo
          }
    }
`;

export const GET_BATCHMATES_LIST = gql`
    query getBatchmates($username: String!) {
        batchmates(username: $username) {
            username
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