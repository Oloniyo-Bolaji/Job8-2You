'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Pie from '@components/Pie'


const Count = ({ count, title, colour, icon, background }) => {
  const pathname = usePathname()

  return (
    <div
    style={{borderBottomColor: colour}}
      className="count w-full bg-[white] flex flex-row rounded-[10px] items-center justify-evenly h-[80px] border-b-[2px] border-solid"
    >
      <div className='p-[10px] rounded-[5px]' style={{backgroundColor: background}}>
        {pathname === '/dashboard/employer' ? (
          <span className="text-[25px] text-center " style={{ color: colour }}>
            {icon}
          </span>
        ) : (
          <Pie value={count} colour={colour}/>
        )}
      </div>
      <div className="text-center">
        <h1 className="text-[30px] font-bold">
          {count < 10 ? `0${count}` : count}
        </h1>
        <p className="text-[#ccc] text-[14px]">{title}</p>
      </div>     
    </div>
  )
}

export default Count
