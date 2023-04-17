import { useUserContext } from '@/hooks/useUserContext';
import { ADD_USER } from '@/mutations/userMutation'
import { GET_USER_DETAIL } from '@/query/UserQuery';
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'

const Onboarding = () => {
    const [loading, setLoading] = useState(false)
    const {user} = useUserContext();

    const [addUser] = useMutation(ADD_USER, {
        variables: {username: user},
        refetchQueries: [{ query: GET_USER_DETAIL, variables: {username: user}}]
    })

    const handleClick = () => {
        setLoading(true);
        addUser();
    }

    return (
        <div>
            <p>Welcome to LeetCode Buddy.</p>
            <button onClick={handleClick} disabled={loading}
            className='m-2 p-2 bg-lc-gray-3'>{loading && "Loading ... " } {!loading && "Get Started"}</button>
        </div>
    )
}

export default Onboarding