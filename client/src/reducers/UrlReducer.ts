import { UrlAction, UrlState } from "@/types/url";

export const UrlReducer = (state:UrlState, action: UrlAction) => {
    switch (action.type) {
        case "VISIT":
            return {
                url: action.payload
            }

        default: 
            return state;
    }
}