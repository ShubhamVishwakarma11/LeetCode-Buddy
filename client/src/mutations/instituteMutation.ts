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