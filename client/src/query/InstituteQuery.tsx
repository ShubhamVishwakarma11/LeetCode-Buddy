import { gql } from "@apollo/client";

export const GET_INSTITUTES_LIST = gql`
    query getInstitutes {
        institutes{
            id
            name
            city
            student_count
            students
          }
    }
`;

export const GET_BATCHMATES_LIST = gql`
    query getBatchmates($username: String!) {
        batchmates(username: $username) {
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