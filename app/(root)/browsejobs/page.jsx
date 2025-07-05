'use client'

import { RoleContext } from '@app/context'
import JobCard from '@components/JobCard'
import React, { useContext } from 'react'

const BrowseJobs = () => {
  const { postedJobs } = useContext(RoleContext)
  return (
    <div className="sm:px-[50px] px-[10px] ">
      <h1 className="font-bold text-[20px] text-center">All Jobs</h1>
      <div className='pt-[20px] grid grid-cols-1 sm:grid-cols-2 gap-[10px]'>
        {postedJobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  )
}

export default BrowseJobs
