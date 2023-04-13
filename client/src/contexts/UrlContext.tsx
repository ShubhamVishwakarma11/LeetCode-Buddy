import { UrlReducer } from "@/reducers/UrlReducer";
import { UrlContextType, UrlContextProviderProps } from "@/types/url";
import { createContext, useEffect, useReducer } from "react";


export const UrlContext = createContext<UrlContextType | null>(null);

export const UrlContextProvider = ({children}:UrlContextProviderProps) => {
    const [state, dispatch] = useReducer(UrlReducer, {url:null});

    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url!;
            dispatch({type: "VISIT", payload: url})
        });
    }, [])

    return (
        <UrlContext.Provider value={{...state, dispatch}}>
            {children}
        </UrlContext.Provider>
    )
}