'use client'

import { useState, useEffect, useContext } from 'react'
import Header from '@components/Header.jsx'
import JobCard from '@components/JobCard.jsx'
import Image from 'next/image'
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import '../globals.css'
import { useRouter } from 'next/navigation'
import { RoleContext } from '@app/context'
import Alert from '@mui/material/Alert'
import { Skeleton } from '@mui/material'

export default function Home() {
  const router = useRouter()
  const {
    jobSearch,
    setJobSearch,
    searchJobs,
    loading,
    fetchJobs,
    postedJobs,
    setPostedJobs,
    fetchUserJobs,
  } = useContext(RoleContext)

  const [categories, setCategories] = useState([
    'Mobile Application Developer',
    'UI/UX Designer',
    'Fullstack Developer',
    'Cybersecurity',
    'Data Analysis',
    'Frontend Developer',
    'Backend Developer',
    'Product Managment',
    'Artificial Intelligence',
  ])

  const fetchJobsByCategory = async (category) => {
    const res = await fetch(`/api/jobs/category/${category}`, {
      cache: 'no-store',
    })
    const result = await res.json()
    setPostedJobs(result.data)
  }

  return (
    <div>
      {loading ? (
        <div className="home w-full mt-[0px]">
          <Skeleton variant="rectangular" sx={{ width: '100%' }} height={250} />
          <main className="w-full flex flex-col-reverse sm:flex-row p-[20px] justify-between">
            <section className="w-full sm:w-[65%] py-[10px] px-[30px]">
              <div className="w-full grid grid-cols-1 gap-[15px]">
                <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
                <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
                <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
              </div>
            </section>
            <aside className="w-full sm:w-[35%]">
              <div className="w-full">
                <Skeleton variant="rectangular" sx={{ width: '100%' }} height={30} />
              </div>

              <div className="w-full sm:mt-[10px]">
                <div className="w-full sm:p-[10px]">
                  <h3 className="sm:text-center sm:font-bold hidden sm:block">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  </h3>
                  <ul className="categories flex w-full overflow-x-auto sm:flex-col sm:gap-[5px] gap-[10px] py-[5px] px-[10px] whitespace-nowrap">
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
                  </ul>
                </div>
              </div>

              <div className="sm:block hidden sm:mt-[10px] w-full">
                <Skeleton variant="rectangular" sx={{ width: '100%' }} height={120} />
              </div>
            </aside>
          </main>
        </div>
      ) : (
        <div className="home w-full">
          <Header />
          <main className="w-full flex flex-col-reverse sm:flex-row p-[20px] justify-between">
            <section className="w-full sm:w-[65%] py-[10px] sm:px-[30px] px-[10px]">
              <h2 className="text-center font-bold text-[18px]">Available Jobs</h2>
              <div className="w-full grid grid-cols-1 gap-[15px]">
                {!postedJobs ? (
                  <div className="flex justify-center items-center h-screen">
                    <p>No Jobs Found</p>
                  </div>
                ) : (
                  postedJobs.slice(0, 5).map((job) => {
                    return (
                      <JobCard
                        key={job.id}
                        job={job}
                        fetchJobs={fetchJobs}
                        fetchUserJobs={fetchUserJobs}
                      />
                    )
                  })
                )}
              </div>
            </section>
            <aside className="w-full sm:w-[35%]">
              <div className="w-full">
                <div className="h-[35px]">
                  <input
                    type="text"
                    placeholder="Search for Job by title or company"
                    value={jobSearch}
                    onClick={(e) => {
                      setJobSearch(e.target.value)
                    }}
                    className="w-[80%] h-full border-[1px] border-solid border-[black] outline-[0] rounded-[5px] placeholder:text-[15px] placeholder:p-[5px]"
                  />
                  <button
                    onClick={() => {
                      searchJobs(jobSearch)
                    }}
                    className="h-full w-[20%] p-[8px] text-[14px] text-[white] bg-[#007bff] rounded-[5px] border-[0]"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="w-full sm:mt-[10px]">
                <div className="w-full sm:bg-[white] sm:p-[10px] sm:rounded-[10px] sm:shadow-[2px_2px_3px_#007bff10]">
                  <h3 className="sm:text-center sm:font-bold hidden sm:block">Categories</h3>
                  <ul className="categories flex w-full overflow-x-auto sm:flex-col sm:gap-[5px] gap-[10px] py-[5px] px-[10px] whitespace-nowrap">
                    {categories.map((category, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            fetchJobsByCategory(category)
                          }}
                          className="sm:list-none sm:text-[16px] sm:text-[#2c3e50] cursor-pointer flex-[0_0_auto] bg-[white] p-[5px] rounded-[10px]"
                        >
                          {category}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <div className="sm:block hidden sm:mt-[10px] w-full">
                <div className="post bg-[white] rounded-[10px] p-[10px] flex flex-col text-center gap-[10px]">
                  <h3>Post a job</h3>
                  <p>Got job vacany? Want to reach a larger audience?</p>
                  <button className=" text-[#007bff] bg-[white] p-[5px] m-auto border-[1px] border-solid border-[#007bff]">
                    <Link href="/create" className="no-underline text-[#007bff]">
                      Post Job
                    </Link>
                  </button>
                </div>
              </div>
            </aside>
          </main>
        </div>
      )}
    </div>
  )
}
