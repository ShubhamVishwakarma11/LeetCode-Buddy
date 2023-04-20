import { useUserContext } from '@/hooks/useUserContext'
import { GET_BATCHMATES_LIST } from '@/query/InstituteQuery'
import { useQuery } from '@apollo/client'
import React from 'react'
import FriendItem from '../friends/FriendItem'

const BatchmatesList = () => {
    const {user} = useUserContext();

    const {loading, error, data} = useQuery(GET_BATCHMATES_LIST, {
        variables: {username: user}
    })
    
    if (loading) return <p>Loading ... </p>
    if (error) return <p>{error.message}</p>

  return (!loading && !error && 
    <div className='flex flex-col mt-2 justify-center items-center w-full py-4 px-8 rounded-lg'>
        <div className="flex flex-col gap-2 w-full mt-4">
                {data.batchmates.map( (friend:any) => {
                    return <FriendItem
                        key={friend.username}
                        username= {friend.username}
                        realName = {friend.profile.realName} 
                        ranking = {friend.profile.ranking}
                        acSubmissionNum = {friend.acSubmissionNum}
                        allQuestionsCount={friend.allQuestionsCount}
                        userAvatar={friend.profile.userAvatar}
                    />
                } )}
            </div>
    </div>
  )
}

export default BatchmatesList