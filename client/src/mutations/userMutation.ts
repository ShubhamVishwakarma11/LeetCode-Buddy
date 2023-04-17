import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!) {
        addUser(username: $username) {
            username
        }
    }
`;