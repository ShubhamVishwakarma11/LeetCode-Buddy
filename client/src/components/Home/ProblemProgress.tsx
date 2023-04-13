import clsx from 'clsx'
import React from 'react'

type Props = {
  color: string,
  difficulty: string
}

const ProblemProgress = ({color, difficulty}: Props) => {
  return (
    <div className='flex flex-col w-[12rem] gap-1'>
        <div className="flex w-full items-end text-xs justify-between">
          <div className="w-[53px] text-[0.8rem] text-lc-text-dark">
            {difficulty} 
          </div>
          <div className="flex items-center">
            <span className="mr-[5px] text-base font-medium leading-[20px] text-lc-text-light">
              77
            </span>
            <span className="text-xs font-medium text-lc-text-dark">
              /633
            </span>
          </div>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full max-w-none">
          <div className={clsx(`absolute h-full w-full`,
          `${color==="green" && "bg-lc-green-alt"}`,
          `${color==="orange" && "bg-lc-orange-alt"}`,
          `${color==="red" && "bg-lc-red-alt"}`,          
          )}></div>
        <div className={clsx(`absolute h-full rounded-full transition-all duration-300 ease-out`,
        `${color==="green" && "bg-lc-green"}`,
        `${color==="orange" && "bg-lc-orange"}`,
        `${color==="red" && "bg-lc-red"}`,  
        )} style={{width: "12.1643%"}}></div>
      </div>
    </div>
  )
}

export default ProblemProgress