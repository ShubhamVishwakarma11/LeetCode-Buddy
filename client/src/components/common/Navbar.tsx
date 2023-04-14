import React from 'react'
import Link from 'next/link'
import {CgProfile} from 'react-icons/cg'
import {FaUserFriends} from 'react-icons/fa'
import {IoSchool} from 'react-icons/io5'

const Navbar = () => {
  return (
    <div className='flex items-center justify-around gap-1 bg-lc-gray-2 text-lc-text-dark w-full fixed bottom-0 z-[500]'>
        <Link className='w-full' href="/"><div className="flex flex-col gap-1 bg-lc-gray-1 items-center justify-center w-full p-2 rounded">
            <CgProfile/>
            <p className='text-sm'>Profile</p> 
        </div></Link>
        <Link className='w-full' href="/friends"><div className="flex flex-col gap-1 bg-lc-gray-1 items-center justify-center w-full p-2 rounded">
            <FaUserFriends/> 
            <p className='text-sm'>Friends</p>
        </div></Link>
        <Link className='w-full'  href="/institute"><div className="flex flex-col gap-1 bg-lc-gray-1 items-center justify-center w-full p-2 rounded">
            <IoSchool/> 
            <p className='text-sm'>Institute</p>
        </div></Link>
    </div>
  )
}

export default Navbar