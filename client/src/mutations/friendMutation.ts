
import { gql } from '@apollo/client'

export const ADD_FRIEND = gql`
    mutation addFriend($userUsername:String!, $friendUsername:String!) {
        addFriend(userUsername:$userUsername, friendUsername:$friendUsername) {
            id
            friends
          }
    }
`