import { FriendItemProps } from '@/types/friend'
import Image from 'next/image'
import React from 'react'




const FriendItem = ({username, realName, ranking, acSubmissionNum, allQuestionsCount, userAvatar}:FriendItemProps) => {
  return (
    <div className='flex gap-2 bg-lc-gray-1 rounded-lg w-full justify-between items-center p-4'>
        <div className="flex gap-2 items-center">
        <Image src={userAvatar} alt="avatar" width={50} height={50}/>
        <div className="flex flex-col">
            <p className='text-lg' > {username}</p>
            <p className='text-lc-text-dark text-sm'>{realName} </p>
        </div>
        </div>
        <div className="">
            {/* circular progress bar  */}
            <div className="shrink-1 relative max-h-[70px] max-w-[70px] z-base">
                        <svg className="h-full w-full origin-center -rotate-90 transform" viewBox="0 0 100 100">
                            <circle fill="none" cx="50px" cy="50px" r="46" strokeWidth="3" strokeLinecap="round" stroke="currentColor" 
                            className="w-[100px] text-lc-gray-3"></circle>
                            <circle fill="none" cx="50px" cy="50px" r="46" strokeWidth="5" strokeLinecap="round" stroke="currentColor" 
                            className="cursor-pointer text-lc-orange drop-shadow-[0_2px_4px_rgba(255,161,22,0.2)]" 
                            strokeDasharray={`${(acSubmissionNum[0].count / allQuestionsCount[0].count) * 290} ${290 - (acSubmissionNum[0].count / allQuestionsCount[0].count) * 290}`} strokeDashoffset="0"></circle>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center">
                            <div>
                                <div className="text-[18px] font-medium text-lc-text-light dark:text-dark-label-1">{acSubmissionNum[0].count}
                                </div>
                                
                            </div>
                        </div>
            </div>
        </div>
    </div>
  )
}

export default FriendItem