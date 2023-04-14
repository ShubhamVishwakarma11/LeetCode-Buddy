import Appbar from '@/components/common/Appbar';
import Navbar from '@/components/common/Navbar';
import React from 'react'

interface Props {
    children: React.ReactNode;
  }

const CommonLayout = ({children}: Props) => {
  return (
    <div>
        <Appbar></Appbar>
        <div className="bg-lc-gray-2 py-[5rem] ">
          {children}
        </div>
          
        <Navbar></Navbar>
    </div>
  )
}

export default CommonLayout