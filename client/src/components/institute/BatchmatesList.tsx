import { useUserContext } from '@/hooks/useUserContext'
import { GET_BATCHMATES_LIST } from '@/query/InstituteQuery'
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import FriendItem from '../friends/FriendItem'
import { MoonLoader } from 'react-spinners'
import { UserType } from '@/types/user'

const BatchmatesList = () => {
    const {user} = useUserContext();
    const [sortBy, setSortBy] = useState("");

    const {loading, error, data} = useQuery(GET_BATCHMATES_LIST, {
        variables: {username: user}
    })


    const sortList = (a:UserType, b:UserType) => {
        if (sortBy == "1") 
            return b.acSubmissionNum[0].count - a.acSubmissionNum[0].count;
        else if (sortBy == "2") 
            return b.userContestRanking.rating - a.userContestRanking.rating;
        else if (sortBy == "3") 
            return a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1;
        else return 0;  
    }
    
    if (loading) return <MoonLoader className='mt-6' color="#ffa116" speedMultiplier={0.8}/>
    if (error) return <p>{error.message}</p>

  return (!loading && !error && 
    <div className='flex flex-col mt-2 justify-center items-center w-full py-4 px-8 rounded-lg'>
            <select 
                        className="w-full p-3 border-lc-gray-2 bg-lc-gray-1 rounded-lg" 
                        value={sortBy}
                        onChange={(e) => {setSortBy(e.target.value)}}
                        name="" 
                        id=""
                    >  
                        <option value="0">Sort by (Default)</option> 
                        <option value="1">Sort by Questions Solved</option>
                        <option value="2">Sort by Contest Rating</option>
                        <option value="3">Sort Alphabetically</option>
                    </select>
        <div className="flex flex-col gap-2 w-full mt-4">
                {[].concat(data.batchmates)
                .sort(sortList).map( (friend:any) => {
                    return <FriendItem
                        key={friend.username}
                        username= {friend.username}
                        realName = {friend.profile.realName} 
                        ranking = {friend.profile.ranking}
                        acSubmissionNum = {friend.acSubmissionNum}
                        allQuestionsCount={friend.allQuestionsCount}
                        userAvatar={friend.profile.userAvatar}
                        rating={friend.userContestRanking.rating}
                    />
                } )}
            </div>
    </div>
  )
}

export default BatchmatesList