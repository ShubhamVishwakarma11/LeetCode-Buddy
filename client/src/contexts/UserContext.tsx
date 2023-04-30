import  { createContext, useReducer, useEffect } from "react";
import {  UserContextType, UserContextProviderProps } from "@/types/user";
import { UserReducer } from "@/reducers/UserReducer";


export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({children}: UserContextProviderProps) => {
    const [state, dispatch] = useReducer(UserReducer, {user:null})

    useEffect( () => {
        chrome.storage.local.get(["user"]).then((result) => {
            if (result.user) {
                dispatch({type:"LOGIN", payload: result.user}) 
            }
        });
    }, [])

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

