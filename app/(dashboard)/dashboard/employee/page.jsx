'use client'

import { useContext, useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import '../../dashboard.css'
import Link from 'next/link'
import { RoleContext } from '@app/context'
import { FaUser } from 'react-icons/fa'
import { PiBagFill } from 'react-icons/pi'
import { IoIosBriefcase } from 'react-icons/io'
import { RiUserReceived2Line } from 'react-icons/ri'
import JobCard from '@components/JobCard'
import Pie from '@components/Pie'
import EmployeeTable from '@components/EmployeeTable'
import Count from '@components/Count'
import RecommendedJob from '@components/RecommendedJob'
import { Skeleton } from '@mui/material'

const Employee = () => {
  const { data: session } = useSession()
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [completion, setCompletion] = useState(0)
  const {
    user,
    userJobs,
    userDetails,
    activeJobs,
    chartData,
    pieData,
    getCompletion,
    applications,
    bookmarks,
    rejected,
  } = useContext(RoleContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs')
      const result = await res.json()
      const data = result.data
      const userSkills = user?.skills

      const recommended = data.filter((job) =>
        job.requirements?.some((requirementText) =>
          userSkills.some((skill) => requirementText.toLowerCase().includes(skill.toLowerCase()))
        )
      )

      console.log(recommended)
      setRecommendedJobs(recommended)
    }

    fetchJobs()
  }, [user])

  const removeRecommended = (id) => {
    const newRecommended = recommendedJobs.filter((job) => job.id !== id)
    setRecommendedJobs(newRecommended)
  }

  useEffect(() => {
    if (user && applications && userJobs && chartData) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [])

  return (
    <div>
      {loading ? (
        <div className="w-full flex flex-col gap-[10px]">
          <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
          <section className="counts w-full py-[5px] px-[0] grid grid-cols-2 sm:grid-cols-4 gap-[10px]">
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={80} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={80} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={80} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={80} />
          </section>
          <section className="w-full flex flex-col gap-[10px] rounded-[10px] p-[10px]">
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={100} />
          </section>
          <section className="grid grid grid-cols-2 sm:grid-cols-4 w-full gap-[10px]">
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={100} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={100} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={100} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={100} />
          </section>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-[10px]">
          <header className="rounded-[10px] w-full h-[50px] flex gap-[5px] items-center bg-[white] py-[0] px-[10px]">
            <h4 className="font-bold">Welcome back, {user?.name}</h4>
          </header>
          <section className="counts w-full py-[5px] px-[0] grid grid-cols-1 sm:grid-cols-4 sm:gap-[10px] gap-[5px]">
            <Count count={user?.profileViews} title={'Profile Visits'} colour={'red'} />
            <Count count={rejected.length} title={'Rejected Applications'} colour={'green'} />
            <Count count={applications.length} title={'Applications Submitted'} colour={'orange'} />
            <Count count={bookmarks.length} title={'Bookmarked Jobs'} colour={'blue'} />
          </section>
          {applications && (
            <section className="bg-[white] rounded-[10px] p-[5px]">
              <h3 className="m-[5px] font-bold text-[15px]">Applications Submitted</h3>
              <EmployeeTable applications={applications} />
            </section>
          )}
          <section className="bg-[white] rounded-[10px] p-[5px]">
            <h3 className="m-[5px] font-bold text-[15px]">Recommended For You</h3>
            <div className="grid grid grid-cols-1 sm:grid-cols-2 w-full gap-[10px]">
              {recommendedJobs?.slice(0, 4).map((job, index) => (
                <RecommendedJob key={index} job={job} removeRecommended={removeRecommended} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Employee
