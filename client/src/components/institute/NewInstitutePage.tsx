import React from 'react'
import { MdOutlineSchool } from 'react-icons/md'
import NewInstituteForm from './NewInstituteForm'

const NewInstitutePage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 py-2 w-full h-full bg-lc-gray-2 text-white">
                <div className='flex flex-col justify-center items-center w-full py-4 px-8'>
                    <MdOutlineSchool className='text-4xl text-lc-text-dark'/>
                    <p className='text-lc-text-dark'> Add your Institute </p>
                    <NewInstituteForm />
                </div>
            </div>
  )
}

export default NewInstitutePage