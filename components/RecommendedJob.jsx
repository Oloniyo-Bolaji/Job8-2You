"use client"

import { CgClose } from 'react-icons/cg'
import React from 'react'

const RecommendedJob = ({ job, removeRecommended }) => {
  return (
    <div style={{backgroundColor : "#ff6b35"}} className="rounded-[10px] px-[5px] py-[10px] h-[150px] w-full flex justify-evenly ">
      <div>
        <h3 className="font-bold text-[15px]">{job.title}</h3>
        <p className="text-[14px]">{job.company}</p>
        <p className="text-[14px]">{job.roleType}</p>
        <span className="text-[14px]">{job.salary}</span>
      </div>
      <div>
        <button onClick={() => removeRecommended(job.id)}>
          <CgClose />
        </button>
      </div>
    </div>
  )
}

export default RecommendedJob
