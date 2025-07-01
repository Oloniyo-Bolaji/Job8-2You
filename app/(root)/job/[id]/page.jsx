'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { UploadButton } from '@uploadthing/react'
import Image from 'next/image'
import Link from 'next/link'
import '../../../globals.css'
import { useSession } from 'next-auth/react'
import Upload from '@components/Upload'
import { toast } from 'react-toastify'
import { Skeleton } from '@mui/material'

const Job = () => {
  const [job, setJob] = useState({})
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const id = params.id

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/${id}`)
      const result = await res.json()
      setJob(result.data)
      setLoading(false)
    }

    if (id) fetchJob()
  }, [id])

  const sendApplication = async (resumeUrl) => {
    if (!session?.user?.email) {
      toast.error('Please log in to apply for a job.')
      return
    }

    try {
      const res = await fetch(`/api/jobs/${job.id}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: resumeUrl,
          jobId: job.id,
          userEmail: session.user.email,
        }),
      })

      const result = await res.json()
      if (result.success) {
        toast.success('Application submitted successfully!')
        router.push('/employeedashboard')
      } else {
        throw new Error(result.error || 'Something went wrong')
      }
    } catch (err) {
      console.error('Application Error:', err)
      toast.error('Error submitting application')
    }
  }

  const getExpiringDate = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today

    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return daysLeft
  }

  const linkToProfile = async () => {
    const res = await fetch(`/api/users/${job?.user?.id}/profileview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: job.user.id,
      }),
    })
    const result = await res.json()
  }

  return (
    <>
      {loading ? (
        <div className="w-full py-[20px] px-[40px] flex flex-col gap-[10px]">
          <div className="flex h-[200px] flex-col justify-center text-center items-center gap-[10px]">
            <Skeleton variant="circular" width={60} height={60} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '200px' }} />
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <div className='w-[300px] sm:w-[1000px]'>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            </div>
            <div className='w-[200px] sm:w-[400px]'>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            </div>
            <div className='w-[150px] sm:w-[350px]'>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            </div>
            <div className='w-[300px] sm:w-[850px]'>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            </div>
            <div className='w-[100px] sm:w-[500px]'>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            </div>
             <div className='w-[300px] sm:w-[750px]'>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            </div>
             <div className='w-[120px] sm:w-[400px]'>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100px' }} />
            </div>
             <div className='w-[300px] sm:w-[700px]'>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '250px' }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full py-[20px] px-[40px] flex flex-col gap-[10px]">
          <div className="jobBtn">
            <button
              onClick={() => {
                if (job.id) {
                  router.push('/')
                } else {
                  console.log(err)
                }
              }}
            >
              Back Home
            </button>
          </div>
          <div className="w-full relative">
            <div className="h-[200px] bg-[#007bff] rounded-t-[10px]"></div>
            <div className="absolute bottom-[-5%] left-[50%]">
              {job.user?.image && (
                <Image
                  src={job.user?.image}
                  alt={job.user?.name}
                  width={60}
                  height={60}
                  className="rounded-[50%]"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center text-center items-center gap-[10px]">
            <h3 className="font-bold">{job.title}</h3>
            <div className="flex gap-[5px] text-[15px]">
              <span>{job.category}</span>
              <span>|</span>
              <span>
                <Link
                  href={`/userprofile/${job.user?.id}`}
                  onClick={linkToProfile}
                  className="underline text-[#007bff]"
                >
                  {job.company}
                </Link>
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <div>
              <label className="font-bold text-[15px]">Job Description</label>
              <p className="text-[14px] leading-[20px]">{job.description}</p>
            </div>
            <div>
              <label className="font-bold text-[15px]">Job Reqiurments</label>
              <ul className="list-disc text-[14px]">
                {job.requirements?.map((requirement, index) => {
                  return (
                    <li key={index} className="list-disc">
                      {requirement}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <label className="font-bold text-[15px]">Location</label>
              <p className="text-[14px]">{job.location}</p>
            </div>
            <div>
              <label className="font-bold text-[15px]">Role</label>
              <p className="text-[14px]">{job.roleType}</p>
            </div>
            <div>
              <label className="font-bold text-[15px]">Salary</label>
              <p className="text-[14px]">{job.salary}</p>
            </div>
            <div>
              <label className="font-bold text-[15px]">Deadline</label>
              <p className="text-[14px]">{job.deadline}</p>
            </div>
            {job.jobLink ? (
              <div>
                <a
                  href={job.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[18px] text-[#007bff] font-bold"
                >
                  Apply Here
                </a>
              </div>
            ) : (
              <div>
                {/*<label>Upload a copy of your CV/Resume</label>*/}
                {getExpiringDate(job.deadline) > 0 ? (
                  <Upload onSuccess={(resumeUrl) => sendApplication(resumeUrl)} />
                ) : (
                  <p className="font-bold">Expired</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Job
