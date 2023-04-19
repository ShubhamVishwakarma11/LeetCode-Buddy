import { gql } from "@apollo/client";

export const GET_INSTITUTES_LIST = gql`
    query getInstitutes {
        institutes{
            id
            name
            city
            student_count
          }
    }
`;