'use client'

import { useContext, useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import '../../dashboard.css'
import Link from 'next/link'
import { RoleContext } from '@app/context'
import { FaUser } from 'react-icons/fa'
import { PiBagFill } from 'react-icons/pi'
import { IoIosBriefcase } from 'react-icons/io'
import EmployerTable from '@components/EmployerTable'
import { RiUserReceived2Line } from 'react-icons/ri'
import CustomBarChart from '@components/CustomBarChart'
import CustomPieChart from '@components/CustomPieChart'
import CustomLineChart from '@components/CustomLineChart'
import Count from '@components/Count'
import { CgSearch } from 'react-icons/cg'
import { Skeleton } from '@mui/material'

const Employer = () => {
  const {
    user,
    userJobs,
    activeJobs,
    chartData,
    pieData,
    applications,
    changeStatus,
    filterTable,
    searchedTitle,
    setSearchedTitle,
  } = useContext(RoleContext)
  const [loading, setLoading] = useState(true)

  const formatDate = (date) => {
    const postedDate = new Date(date)
    return `${postedDate.toLocaleDateString()} at ${postedDate.toLocaleTimeString()}`
  }

  useEffect(() => {
    if (user && applications && userJobs && chartData && activeJobs) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [])
  return (
    <div>
      {loading ? (
        <div className="dashboard w-full flex flex-col gap-[10px]">
          {/*welcome*/}
          <Skeleton variant="rounded" />
          {/*visits and profile completion*/}
          <section className="w-full py-[5px] px-[0] grid grid-cols-2 sm:grid-cols-4 gap-[10px]">
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={80} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={80} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={80} />
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={80} />
          </section>
          {/*recommendations*/}
          <section className="w-full flex flex-col gap-[10px] rounded-[10px] p-[10px]">
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={100} />
          </section>
          <section className="w-full flex sm:flex-row flex-col gap-[10px] sm:h-[350px] h-full items-start">
            <div className="sm:w-[70%] w-[100%]">
              <Skeleton variant="rounded" sx={{ width: '100%', height: '100%' }} />
            </div>
            <div className="sm:w-[70%] w-[100%]">
              <Skeleton variant="rounded" sx={{ width: '100%', height: '100%' }} />
            </div>
          </section>
          <section className="flex sm:flex-row flex-col gap-[10px] items-start">
            <div className="sm:w-[40%] w-[100%]">
              <Skeleton variant="rounded" sx={{ width: '100%', height: '100%' }} />
            </div>
            <div className="sm:w-[60%] w-[100%]">
              <Skeleton variant="rounded" sx={{ width: '100%', height: '100%' }} />
            </div>
          </section>
        </div>
      ) : (
        <div className="dashboard w-full flex flex-col gap-[10px]">
          {/*welcome*/}
          <header className="rounded-[10px] w-full flex justify-between items-center bg-[white] py-[10px] px-[10px]">
            <h4 className="font-bold sm:text-[16px] text-[14px]">Welcome back, {user?.name}</h4>
            <button className="bg-[#007bff] text-[#fff] border-[0] text-[16px] py-[10px] px-[20px] cursor-pointer transition-colors duration-200 ease-in-out">
              <Link href="/create">New Job</Link>
            </button>
          </header>
          {/*visits and profile completion*/}
          <section className="w-full py-[5px] px-[0] grid grid-cols-2 sm:grid-cols-4 sm:gap-[10px] gap-[5px]">
            <Count
              count={user.profileViews}
              title={'Profile Visits'}
              colour={'red'}
              background={'rgba(200, 0, 0, 0.1)'}
              icon={<FaUser />}
            />
            <Count
              count={userJobs.length}
              title={'Job Posts'}
              colour={'green'}
              background={'rgba(0, 200, 0, 0.1)'}
              icon={<PiBagFill />}
            />
            <Count
              count={activeJobs.length}
              title={'Active Jobs'}
              colour={'orange'}
              background={'rgba(255, 165, 0, 0.1)'}
              icon={<IoIosBriefcase />}
            />
            <Count
              count={applications.length}
              title={'Applications'}
              colour={'blue'}
              background={'rgba(0, 0, 200, 0.1)'}
              icon={<RiUserReceived2Line />}
            />
          </section>
          {/*recommendations*/}
          <section className="w-full flex flex-col bg-[white] gap-[10px] rounded-[10px] p-[10px]">
            <div className="w-full flex justify-between">
              <h3 className="m-[5px] font-bold text-[15px]">Applicants</h3>
              <div className="relative sm:w-[250px] w-[150px] flex items-center">
                <input
                  type="text"
                  placeholder="Filter by Job title"
                  value={searchedTitle}
                  onChange={(e) => setSearchedTitle(e.target.value)}
                  className="w-full border-[black] border-[1px] border-solid rounded-[5px] placeholder:p-[5px] placeholder:text-[15px] focus:outline-[0]"
                />
                <button
                  className="absolute right-2  p-1"
                  onClick={() => filterTable(searchedTitle)}
                >
                  <CgSearch />
                </button>
              </div>
            </div>

            {applications && (
              <EmployerTable applications={applications} changeStatus={changeStatus} />
            )}
            {/* */}
          </section>
          {chartData && pieData && (
            <section className="w-full flex sm:flex-row flex-col gap-[10px] sm:h-[350px] h-full items-start">
              <CustomBarChart chartData={chartData} />
              <CustomPieChart pieData={pieData} />
            </section>
          )}
          <section className="flex sm:flex-row flex-col gap-[10px] items-start">
            <div className="sm:w-[40%] w-[100%] rounded-[10px] bg-[white] p-[5px]">
              <h5 className="m-[5px] font-bold text-[15px]">Posted Jobs</h5>
              <div className="w-full flex gap-[5px] flex-col">
                {userJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border-b-[1px] border-solid border-b-[black] text-[12px]"
                  >
                    <h6 className="font-bold">{job.title}</h6>
                    <p>{formatDate(job.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>
            {chartData.applications && <CustomLineChart chartData={chartData} />}
          </section>
        </div>
      )}
    </div>
  )
}

export default Employer
