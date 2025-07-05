"use client"


import React from 'react'

const DashboardCard = ({ job }) => {
  return (
    <div style={{backgroundColor : "#007bff20"}} className="rounded-[10px] px-[10px] py-[10px]  w-full">
      <div>
        <h3 className="font-bold text-[15px] text-[#007bff]">{job.title}</h3>
        <p className="text-[13px]">{job.company}</p>
        <p className="text-[14px]">{job.roleType}</p>
        <span className="text-[14px]">{job.salary}</span>
      </div>
    </div>
  )
}

export default DashboardCard
