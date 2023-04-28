import { gql } from '@apollo/client'

export const SET_INSTITUTE = gql`
    mutation setInstitute($username:String!, $instituteId:ID!) {
        setInstitute(username:$username, instituteId:$instituteId) {
            username
            institute {
              id
              name
              city
              student_count
            }
        }
    }
`

export const ADD_INSTITUTE = gql`
    mutation addInstitute($username: String!,$name: String!, $city: String!, $logo: String) {
        addInstitute(username:$username, name:$name, city:$city, logo: $logo) {
            id
            name
            city
            students
            student_count
            logo
          }
    }
`;