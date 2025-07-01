'use client'

import React from 'react'
import Skeleton from '@mui/material/Skeleton'

const loading = () => {
  return (
    <div className="bg-[white] flex flex-col w-full rounded-[10px] h-full px-[20px] py-[10px]">
      <div className="flex items-center justify-center flex-col">
        <Skeleton variant="text" sx={{ fontSize: 'srem', width: '40px' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
      </div>
      <div className="flex flex-col gap-[10px] ">
        <div className="">
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40px' }} />
          <Skeleton variant="rounded" sx={{ width: '100%' }} height={30} />
        </div>
        <div className="relative">
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40px' }} />
          <Skeleton variant="rounded" sx={{ width: '100%' }} height={30} />
        </div>
        <div className="relative">
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40px' }} />
          <Skeleton variant="rounded" sx={{ width: '100%' }} height={30} />
        </div>
        <div className="relative">
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40px' }} />
          <Skeleton variant="rounded" sx={{ width: '100%' }} height={30} />
        </div>
        <div className="relative">
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40px' }} />
          <Skeleton variant="rounded" sx={{ width: '100%' }} height={70} />
        </div>
        <div className="m-auto">
          <Skeleton variant="rounded" sx={{ width: '50px' }} height={20} />
        </div>
      </div>
    </div>
  )
}

export default loading
