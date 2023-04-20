import { useUserContext } from '@/hooks/useUserContext'
import { GET_USER_DETAIL } from '@/query/UserQuery'
import { useQuery } from '@apollo/client'
import React from 'react'
import {MdOutlineSchool} from 'react-icons/md'
import {SlLocationPin} from 'react-icons/sl'
import {FaUserGraduate} from 'react-icons/fa'
import BatchmatesList from './BatchmatesList'

const InstituteDetail = () => {
    const {user} = useUserContext();
    const {loading, error, data} = useQuery(GET_USER_DETAIL, {
        variables: {username: user}
    })
    if (loading) return <p>Loading ... </p>
    if (error) return <p>{error.message}</p>
  return (
    <div className='w-[8rem]'>
      <div className="flex gap-4 justify-center items-center">
        <MdOutlineSchool className='text-4xl text-lc-text-dark'/>
        <p className='text-lc-text-light text-2xl'>{data.user.institute.name}</p>
      </div>
      <div className="flex justify-around items-center mt-2">
        <div className="flex justify-center gap-2 items-center">
          <SlLocationPin className='text-lc-text-dark'/>
          <p className='text-lc-text-dark'>{data.user.institute.city}</p>  
        </div>
        <div className="flex justify-center gap-2 items-center">
          <FaUserGraduate className='text-lc-text-dark'/>
          <p className='text-lc-text-dark'>{data.user.institute.student_count}</p>
        </div>
      </div>
    </div>
  )
}

export default InstituteDetail