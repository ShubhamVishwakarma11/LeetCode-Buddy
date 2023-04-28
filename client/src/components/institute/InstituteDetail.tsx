import { useUserContext } from '@/hooks/useUserContext'
import { GET_USER_DETAIL } from '@/query/UserQuery'
import { useQuery } from '@apollo/client'
import React from 'react'
import {HiBuildingLibrary} from 'react-icons/hi2'
import {SlLocationPin} from 'react-icons/sl'
import {FaUserGraduate} from 'react-icons/fa'
import {BsInfoCircle} from 'react-icons/bs'
import { MoonLoader } from 'react-spinners'
import Image from 'next/image'

const InstituteDetail = () => {
    const {user} = useUserContext();
    const {loading, error, data} = useQuery(GET_USER_DETAIL, {
        variables: {username: user}
    })
    if (loading) return <MoonLoader color="#ffa116" speedMultiplier={0.8}/>
    if (error) return <p>{error.message}</p>
  return (
    <div className='w-[25rem]'>
      <div className="flex gap-4 items-center ">
        <div className="">
          {data.user.institute.logo ? 
            <Image src={data.user.institute.logo} alt="logo" width={110} height={110}/>
            :
            <HiBuildingLibrary className='text-lc-text-dark text-6xl'/>
          }
          
        </div>
        <div className="flex flex-col items-start ">
          <div className="flex justify-center items-center gap-1">
            <BsInfoCircle className='text-xs'/>
            <p className='text-xs text-lc-text-dark'>About Institute</p>
          </div>
          <p className='text-xl mt-2'>{data.user.institute.name}</p>
          <div className="flex justify-between w-full mt-1 gap-6">
            <div className="flex justify-center gap-1 items-center">
              <div className="flex justify-center gap-1 items-center">
                <SlLocationPin className='text-sm text-lc-text-dark'/>
                <p className='text-sm text-lc-text-dark'>Location: </p>
              </div>
              <p className='text-sm'>{data.user.institute.city}</p>
            </div>
            <div className="flex justify-center gap-1">
            <div className="flex justify-center gap-1 items-center">
                <FaUserGraduate className='text-sm text-lc-text-dark'/>
                <p className='text-sm text-lc-text-dark'>Student Count: </p>
              </div>
              <p className='text-sm'>{data.user.institute.student_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstituteDetail