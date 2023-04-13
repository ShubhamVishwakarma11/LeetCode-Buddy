import { UrlContext } from "@/contexts/UrlContext"
import { useContext } from "react"

export const useUrlContext = () => {
    const context = useContext(UrlContext);

    if (!context) {
        throw Error('useUrlContext must be used inside an UrlContextProvider');
    }

    return context;
}