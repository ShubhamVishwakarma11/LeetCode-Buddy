import React from 'react'
import Image from 'next/image'

import localFont from 'next/font/local'
const myFont = localFont({ src: '../../fonts/SFNewRepublic.ttf' })

const Appbar = () => {
  return (
    <div className='flex justify-center items-center gap-2 bg-lc-gray-1 p-4 w-full fixed top-0 z-[500]'>
        <Image 
        className='-translate-y-1'
            src="/images/lc-logo-dark.png" 
            alt="leetcode-logo" 
            width={28} 
            height={12}
        />
        <p className={myFont.className} > <span className='text-white text-2xl'>LeetCode Buddy</span> </p>
    </div>
  )
}

export default Appbar