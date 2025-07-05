'use client'

import Image from 'next/image'
import Header from '@components/Header.jsx'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useContext } from 'react'
//import "../../globals.css"
import Loading from './Loading'
import { useRouter, usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { RoleContext } from '@app/context'
import { toast } from 'react-toastify'


const categoryEnum = z.enum([
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
const roleEnum = z.enum(['Full-Time', 'Part-Time'])

const jobSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    category: categoryEnum,
    company: z.string().min(1, 'Company is required'),
    location: z.string().min(1, 'Location is required'),
    roleType: roleEnum,
    description: z.string().min(1, 'Description is required'),
    requirementsText: z.string().min(1, 'At least one requirement is required'), // <- add this
    salary: z.string().min(1, 'Salary is required'),
    jobLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    deadline: z.union([z.string(), z.date()]),
  })
  .transform((data) => ({
    ...data,
    requirements: data.requirementsText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  }))

const JobForm = ({ job }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user

  const {fetchJobs} = useContext(RoleContext)

  const [requirementinput, setRequirementInput] = useState('')
  const [posting, setPosting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(jobSchema),
  })

  useEffect(() => {
    if (job) {
      reset({
        title: job.title,
        category: job.category,
        company: job.company,
        location: job.location,
        roleType: job.roleType,
        description: job.description,
        requirementsText: job.requirements?.join(', ') || '',
        salary: job.salary,
        jobLink: job.jobLink,
        deadline: job.deadline?.split('T')[0] || '', // formats ISO date to YYYY-MM-DD
      })
    }
  }, [job, reset])

  const onSubmit = async (data) => {
    setPosting(true)
    const res = await fetch(job ? `/api/jobs/${job.id}` : '/api/jobs/new', {
      method: job ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
        userEmail: session?.user?.email,
      }),
    })

    const result = await res.json()
    setPosting(false)

    if (result.success) {
      toast.success(job ? "Job Post Edited" : 'Job Post Successful!')
      router.push('/')
      fetchJobs()
    } else {
      toast.error('Error posting job: ' + result.error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-[10px]">
        <div className="w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Job Title <span className="text-[red]">*</span>
          </label>
          <input
            className="w-full h-[35px] text-[14px] p-[5px] rounded-[10px] border-[1px] border-solid border-[#ccc] outline-[0] bg-[white]"
            {...register('title')}
          />
          <p className="text-[red] text-[12px]">{errors.title?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Category <span className="text-[red]">*</span>
          </label>
          <select
            {...register('category')}
            className="bg-[white] w-full h-[35px] text-[14px] p-[5px] rounded-[10px] outline-[0] border-[1px] border-solid border-[#ccc]"
          >
            <option>Select Category</option>
            {categoryEnum.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p className="text-[red] text-[12px]">{errors.category?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Job Description <span className="text-[red]">*</span>
          </label>
          <textarea
            rows={5}
            {...register('description')}
            className="bg-[white] w-full text-[14px] p-[5px] h-[80px] rounded-[10px] outline-[0] border-[1px] border-solid border-[#ccc]"
          />
          <p className="text-[red] text-[12px]">{errors.description?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Job Requirements <span className="text-[red]">*</span>
          </label>
          <textarea
            placeholder="E.g., React experience, API integration, Git knowledge"
            {...register('requirementsText')}
            rows={3}
            className="bg-[white] text-[14px] p-[5px] placeholder::text-[12px] placeholder::p-[5px] w-full h-[80px] rounded-[10px] outline-[0] border-[1px] border-solid border-[#ccc]"
          />
          <p className="text-[red] text-[12px]">{errors.requirementsText?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Location <span className="text-[red]">*</span>
          </label>
          <input
            className="w-full h-[35px] text-[14px] p-[5px] rounded-[10px] outline-[0] border-[1px] border-solid border-[#ccc] bg-[white]"
            {...register('location')}
          />
          <p className="text-[red] text-[12px]">{errors.location?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Role Type <span className="text-[red]">*</span>
          </label>
          <select
            {...register('roleType')}
            className="bg-[white] w-full h-[35px] text-[14px] p-[5px] rounded-[10px] border-[1px] border-solid border-[#ccc] outline-[0]"
          >
            <option>Select Role Type</option>
            {roleEnum.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p className="text-[red] text-[12px]">{errors.roleType?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Salary <span className="text-[red]">*</span>
          </label>
          <input
            className="w-full h-[35px] rounded-[10px] text-[14px] p-[5px] outline-[0] border-[1px] border-solid border-[#ccc] bg-[white]"
            {...register('salary')}
          />
          <p className="text-[red] text-[12px]">{errors.salary?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Deadline <span className="text-[red]">*</span>
          </label>
          <input
            className="w-full h-[35px] rounded-[10px] text-[14px] p-[5px] outline-[0] border-[1px] border-solid border-[#ccc] bg-[white]"
            type="date"
            {...register('deadline')}
          />
          <p className="text-[red] text-[12px]">{errors.deadline?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">
            Company <span className="text-[red]">*</span>
          </label>
          <input
            className="w-full h-[35px] rounded-[10px] text-[14px] p-[5px] outline-[0] border-[1px] border-solid border-[#ccc] bg-[white]"
            {...register('company')}
          />
          <p className="text-[red] text-[12px]">{errors.company?.message}</p>
        </div>
        <div className=" w-full p-[5px] flex flex-col gap-[5px]">
          <label className="font-bold text-[16px]">Application Link</label>
          <input
            className="w-full h-[35px] rounded-[10px] text-[14px] p-[5px] outline-[0] border-[1px] border-solid border-[#ccc] bg-[white]"
            {...register('jobLink')}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#007bff] border-[0] text-[white] p-[10px] rounded-[5px]"
          >
            {posting ? <Loading /> : job ? 'Save Changes' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobForm
