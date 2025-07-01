"use client"

import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const loading = () => {
  return (
    <div className='rounded-[10px] w-full h-full sm:px-[20px] py-[10px] flex flex-col gap-[10px]'>
      <Skeleton variant="rounded" />
      <div className='grid sm:grid-cols-2 grid-cols-1 gap-[10px] w-full'>
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
        <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
      </div>
    </div>
  )
}

export default loading
