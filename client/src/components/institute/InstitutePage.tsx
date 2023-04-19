import { useUserContext } from '@/hooks/useUserContext'
import React from 'react'
import {MdOutlineSchool} from 'react-icons/md'
import InstituteForm from './InstituteForm';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAIL } from '@/query/UserQuery';


const InstitutePage = () => {
    const {user} = useUserContext();

    const {loading, error, data} = useQuery(GET_USER_DETAIL,{
        variables: {username: user}
    });


    if (loading) return <p>Loading ...</p>
    if (error) return <p>{error.message}</p>

    if (!data.user.institute) {
        return (
            <div className="flex flex-col justify-center items-center px-4 py-2 w-full h-full bg-lc-gray-2 text-white">
                <div className='flex flex-col justify-center items-center w-full py-4 px-8'>
                    <MdOutlineSchool className='text-4xl text-lc-text-dark'/>
                    <p className='text-lc-text-dark'> Add your Institute </p>
                    <InstituteForm />
                </div>
            </div>
        )
    }
  return (
    <div className="flex flex-col justify-center items-center px-4 py-2 w-full h-full bg-lc-gray-2 text-white">
      <div className='flex flex-col justify-center items-start w-full py-4 px-8 bg-lc-gray-1 rounded-lg'>
            <p className='text-lc-text-light'> institute</p>
        </div>
    </div>
  )
}

export default InstitutePage