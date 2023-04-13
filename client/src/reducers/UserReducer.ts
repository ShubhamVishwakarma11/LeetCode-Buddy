import { UserState, UserAction } from "@/types/user"

export const UserReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case "LOGIN": 
            return {
                user: action.payload
            }
        case "LOGOUT": 
            return {
                user: null
            } 
        default: 
            return state
    }
}