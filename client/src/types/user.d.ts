export type UserType = {
        username: string,
        friends: string[],
        githubUrl: string,
        allQuestionsCount: {
                difficulty: string,
                count: number
        }[],
        acSubmissionNum: {
                difficulty: string,
                count: number,
                submissions: number
        }[],
        profile: {
                realName: string,
                countryName: string,
                starRating: number,
                aboutMe:  string,
                userAvatar:  string,               
                ranking: number
        },
        userContestRanking: {
                attendedContestsCount: number,
                rating: number,
                topPercentage: number,
        },
        recentAcSubmissionList: {
                id:  string,
                title:  string,
                titleSlug:  string,
                timestamp:  string,
        }[],
}

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

