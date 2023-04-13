export interface UrlState {
    url: string | null
}

export type UrlAction = {
    type: "VISIT";
    payload: string;
}

export type UrlContextType = {
    url: Url;
    dispatch: (url: Url) => void;
}

export type UrlContextProviderProps = {
    children: React.ReactNode;
}
