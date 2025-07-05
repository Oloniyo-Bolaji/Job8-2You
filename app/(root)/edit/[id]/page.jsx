'use client'

import Image from 'next/image'
import Header from '@components/Header.jsx'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import JobForm from '@components/JobForm'

const Edit = () => {
  const [job, setJob] = useState({})
  const params = useParams()
  const id = params.id

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/${id}`)
      const data = await res.json()
      console.log(data.data)
      setJob(data.data)
    }
    if (id) fetchJob()
  }, [id])

  return (
    <div className="create">
      <Header />
      <main className='w-full sm:px-[50px] px-[10px] py-[20px]'>
        <h2 className='text-[20px] font-bold text-center'>Edit Job Post</h2>
        <JobForm job={job} />
      </main>
    </div>
  )
}

export default Edit
