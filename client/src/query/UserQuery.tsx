import { gql } from "@apollo/client";

export const GET_USER_DETAIL = gql`
    query getUser($username: String!) {
        user(username: $username) {
            id ,
            username,
            institute {
              id
              name
              city
              student_count
              students
              logo
            }
            friends
            githubUrl
            allQuestionsCount{
              difficulty
              count
            }
            acSubmissionNum {
              difficulty
              count
            }
            profile {
              realName
              userAvatar
              ranking
            }
            userContestRanking {
              attendedContestsCount
              rating
              topPercentage
            }
            recentAcSubmissionList {
              id
              title
              titleSlug
              timestamp
            }
          }
    }
`;

