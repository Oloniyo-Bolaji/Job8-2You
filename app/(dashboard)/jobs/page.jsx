'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import JobCard from '@components/JobCard'
import { RoleContext } from '@app/context'

const Jobs = () => {
  const { data: session } = useSession()
  const { userJobs } = useContext(RoleContext)

  return (
    <div>
      {userJobs && (
        <div className="rounded-[10px] w-full h-full sm:px-[20px] py-[10px] flex flex-col gap-[10px]">
          <div className="flex items-center justify-center bg-[white] w-full rounded-[10px]">
            <h1 className="font-bold text-[30px]">My Jobs</h1>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-[10px] w-full">
            {userJobs.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Jobs
