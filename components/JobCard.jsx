'use client'

import './styles.css'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { IoLocationSharp, IoBookmarkOutline } from 'react-icons/io5'
import { MdAttachMoney, MdWorkOutline } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'


const JobCard = ({ job , fetchJobs, fetchUserJobs}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const addBookmark = async (e) => {
    e.stopPropagation()

    try {
      const res = await fetch(`/api/jobs/${job.id}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id,
        }),
      })

      const result = await res.json()
      if (result.success) {
        toast.success("Job Bookmarked")
      }
    } catch (err) {
      console.error('Bookmark error:', err)
    }
  }
  const viewJob = async () => {
    if (job.id) {
      router.push(`job/${job.id}`)
    } else {
      console.log(err)
    }
    try {
      const res = await fetch(`/api/jobs/${job.id}/counts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await res.json()
      if (result.success) {
        console.log('success')
      }
    } catch (err) {
      console.error('Bookmark error:', err)
    }
  }

  const deleteJob = async (e) => {
    e.stopPropagation()

    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (response.ok) {
        toast.error(result.message) 
        fetchJobs()
        fetchUserJobs()
      } else {
        console.log('Delete failed:', result.error)
        toast.error('Delete failed: ' + result.error)
      }
    } catch (err) {
      console.log('Delete request error:', err)
      toast.error('An error occurred while deleting the job.')
    }
  }

  const getExpiringDate = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today

    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return daysLeft
  }

  return (
    <div
      className="flex flex-col w-full bg-[white] py-[10px] px-[20px] shadow-[2px_2px_3px_#f7f7f7] gap-[10px]"
      onClick={viewJob}
    >
      <div className="flex gap-[10px]">
        {pathname !== '/jobs' && (
          <div>
            {job.user?.image && (
              <Image src={job.user?.image} alt={job.title} width={40} height={40} />
            )}
          </div>
        )}
        <div className="job-info flex flex-col gap-[3px]">
          <div>
            <h5 className="capitalize font-bold text-[16px]">{job.title}</h5>
          </div>
          <div>
            <button className="bg-[brown] text-[white] p-[5px] border-[0] text-[12px]">
              {job.category}
            </button>
          </div>
          <div className="flex items-center text-[#2c3e50] gap-[4px] text-[15px]">
            <span>
              <IoLocationSharp />
            </span>
            <p>{job.location}</p>
          </div>
          <div className="flex items-center text-[#2c3e50] gap-[4px] text-[15px]">
            <span>
              <MdWorkOutline />
            </span>
            <p>{job.roleType}</p>
          </div>
          <div className="flex items-center text-[#2c3e50] gap-[4px] text-[15px]">
            <span>
              <MdAttachMoney />
            </span>
            <p>{job.salary}</p>
          </div>
        </div>
        <div className="ml-auto flex flex-col justify-between">
          {getExpiringDate(job.deadline) <= 0 ? (
            <p className="text-[#ccc] text-[13px]">Expired</p>
          ) : (
            <p className="text-[#ccc] text-[13px]">
              Expires in {getExpiringDate(job.deadline)} days
            </p>
          )}
          {pathname !== '/jobs' ? (
            <button onClick={addBookmark} className=" flex items-center justify-center bg-[#007bff] text-[white] p-[3px] border-[0] text-center">
              <IoBookmarkOutline />
            </button>
          ) : (
            <button className="bg-[#007bff] text-[white] text-[15px] p-[3px] border-[0] rounded-[5px]">
              View
            </button>
          )}
        </div>
      </div>
      {pathname === '/jobs' && (
        <div className="flex items-center justify-center gap-[10px]">
          <button
            className="border-[1px]  bg-[green]  p-[5px] text-[12px] text-[white] hover:scale-[1] hover:bg-[white] hover:text-[green] hover:border-[green] hover:border-solid"
            onClick={(e) => {
              router.push(`/edit/${job.id}`)
              e.stopPropagation()
            }}
          >
            Edit
          </button>
          <button
            className="border-[1px] border-[red] border-solid p-[5px] text-[12px] text-[red]"
            onClick={deleteJob}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default JobCard
