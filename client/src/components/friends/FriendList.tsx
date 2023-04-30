import FriendItem from './FriendItem';
import { useUrlContext } from '@/hooks/useUrlContext';
import { useUserContext } from '@/hooks/useUserContext';
import { GET_FRIENDS_LIST } from '@/query/FriendQuery';
import { useMutation, useQuery } from '@apollo/client';
import {TiUserAdd} from 'react-icons/ti'
import React, { useState } from 'react'
import { ADD_FRIEND } from '@/mutations/friendMutation';
import { MoonLoader } from 'react-spinners';
import { FriendItemProps } from '@/types/friend';
import { UserType } from '@/types/user';



const FriendList = () => {
    const [friendUsername, setFriendUsername] = useState('');
    const [sortBy, setSortBy] = useState("");

    const {url} = useUrlContext();
    const {user} = useUserContext();

    const [addFriend] = useMutation(ADD_FRIEND, {
        variables: {userUsername:user, friendUsername},
        refetchQueries: [{query: GET_FRIENDS_LIST, variables: {username: user }}]
    })


    const {loading, error, data} = useQuery(GET_FRIENDS_LIST,{
        variables: {username: user}
    });

  
    if (!user) return <p>Please Login to your LeetCode Account</p>

    if (loading) return <MoonLoader color="#ffa116" speedMultiplier={0.8}/>
    if (error) return <p>{error.message}</p>


    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        addFriend();
        setFriendUsername('');
        console.log(friendUsername);
    }

    const sortList = (a:UserType, b:UserType) => {
        if (sortBy == "1") 
            return b.acSubmissionNum[0].count - a.acSubmissionNum[0].count;
        else if (sortBy == "2") 
            return b.userContestRanking.rating - a.userContestRanking.rating;
        else if (sortBy == "3") 
            return a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1;
        else return 0;  
    }


  return (
    !loading && !error && 
    <div className="flex flex-col justify-center items-center gap-4 min-w-[25rem]">
        
            {/* add friend list */}
            
            <div className="flex justify-center gap-2  w-full">
                    
                    <form onSubmit={handleSubmit} className='w-[15rem] rounded-lg'>
                        <div className='w-full flex gap-2 justify-between items-center bg-lc-gray-3 rounded-lg'>
                            <input 
                                className='border-lc-gray-2 focus:outline-none bg-lc-gray-3 p-3  text-lc-text-light rounded-lg w-full'
                                value={friendUsername}
                                onChange={(e) => setFriendUsername(e.target.value)}
                                placeholder='Friend Username'
                                type="text"
                                id="text"
                                name="text"
                                spellCheck="false"
                            />
                            <button 
                            disabled={!friendUsername}
                            className="bg-lc-gray-3 p-1 flex justify-center items-center rounded transition-all">
                                <TiUserAdd className='text-xl text-lc-text-dark hover:scale-[1.1] transition-all hover:text-lc-text-light'/>
                            </button>
                        </div>
                    </form>
                    <select 
                        className="w-[7rem] p-3 border-lc-gray-2 bg-lc-gray-3 rounded-lg" 
                        value={sortBy}
                        onChange={(e) => {setSortBy(e.target.value)}}
                        name="" 
                        id=""
                    >  
                        <option value="0">Sort by</option> 
                        <option value="1">Questions</option>
                        <option value="2">Contest Rating</option>
                        <option value="3">Alphabetically</option>
                    </select>
            </div>
            <div className="flex flex-col gap-2 w-full mt-4">
                {
                [].concat(data.friends)
                .sort(sortList)
                .map( (friend:any) => {
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

export default FriendList


