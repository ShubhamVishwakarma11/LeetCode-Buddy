import { useUserContext } from '@/hooks/useUserContext'
import React from 'react'
import {MdOutlineSchool} from 'react-icons/md'
import InstituteForm from './InstituteForm';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAIL } from '@/query/UserQuery';
import InstituteDetail from './InstituteDetail';
import BatchmatesList from './BatchmatesList';
import { MoonLoader } from 'react-spinners';


const InstitutePage = () => {
    const {user} = useUserContext();

    const {loading, error, data} = useQuery(GET_USER_DETAIL,{
        variables: {username: user}
    });


    if (loading) return <div className="flex mt-2 justify-center w-full">
            <MoonLoader color="#ffa116" speedMultiplier={0.8}/>
        </div>
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
  return (!error && !loading && 
    <div className="flex flex-col justify-center items-center px-4 py-2 w-full h-full bg-lc-gray-2 text-white">
      <div className='flex flex-col items-center w-full py-4 px-8 bg-lc-gray-1 rounded-lg'>
            <InstituteDetail />
        </div>
            <BatchmatesList />
    </div>
  )
}

export default InstitutePage