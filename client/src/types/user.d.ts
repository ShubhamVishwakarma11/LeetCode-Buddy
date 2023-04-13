export interface UserState {
    user: string | null;
}

export type UserAction = {
    type: "LOGIN" | "LOGOUT"
    payload: string
}

export type UserContextType = {
    user: User;
    dispatch: (user: User) => void;
};

export type UserContextProviderProps = {
    children: React.ReactNode;
}

