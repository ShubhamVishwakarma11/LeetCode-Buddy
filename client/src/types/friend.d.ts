export type FriendItemProps = {
    key: string,
    username: string,
    realName: string, 
    ranking: number,
    rating: number,
    acSubmissionNum: {
        difficulty: string,
        count: number
    }[],
    allQuestionsCount: {
        difficulty: string, 
        count : number
    }[],
    userAvatar: string
}