'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const RoleContext = createContext()

const RoleProvider = ({ children }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState({})
  const [saving, setSaving] = useState(false)
  const [userJobs, setUserJobs] = useState([])
  const [activeJobs, setActiveJobs] = useState([])
  const [chartData, setChartData] = useState([])
  const [pieData, setPieData] = useState([])
  const [applications, setApplications] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [rejected, setRejected] = useState([])
  const [searchedTitle, setSearchedTitle] = useState('')
  const [jobSearch, setJobSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [userDetails, setUserDetails] = useState({
    headline: '',
    bio: '',
    linkedIn: '',
    x: '',
    instagram: '',
    skills: [],
    resumeURL: '',
  })

  const [employerDetails, setEmployerDetails] = useState({
    companylocation: '',
    year: '',
    description: '',
    contactEmail: '',
    websiteUrl: '',
    address: '',
    linkedIn: '',
    x: '',
    instagram: '',
  })
  const [postedJobs, setPostedJobs] = useState([])

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs')
    const result = await res.json()
    setPostedJobs(result.data)
    setLoading(false)
  }
  useEffect(() => {
    fetchJobs()
  }, [])

  const techStack =
    typeof userDetails.skills === 'string'
      ? userDetails.skills
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : Array.isArray(userDetails.skills)
        ? userDetails.skills
        : []

  const saveDetails = async () => {
    setSaving(true)

    const payload = {
      ...(user.role === 'employee' ? { ...userDetails, skills: techStack } : employerDetails),
    }

    try {
      const res = await fetch(`/api/users/${session?.user?.id}/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: payload,
        }),
      })

      const result = await res.json() // ✅ Only read once

      if (!res.ok) {
        throw new Error(result?.error || 'Unknown error')
      }

      if (result.success) {
        setSaving(false)
        router.push(`/profile${user.role}`)
      }
    } catch (err) {
      toast.error('An error occurred while saving: ' + err.message)
      setSaving(false)
    }
  }

  const getExpiringDate = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today

    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return daysLeft
  }

  const fetchUserJobs = useCallback(async () => {
    if (!session?.user?.id) return

    const res = await fetch(`/api/users/${session.user.id}/jobs`)
    const result = await res.json()
    const data = result.data
    setUserJobs(data)

    const expired = data.filter((job) => getExpiringDate(job.deadline) <= 0).length
    const active = data.length - expired

    const transformed = data.map((job) => ({
      name: job.title,
      clicks: job.clickCount || 0,
      bookmarks: job.bookmarkCount || 0,
      applications: job.applicationCount || 0,
    }))

    setChartData(transformed)
    setPieData([
      { name: 'Expired', value: expired },
      { name: 'Active', value: active },
    ])
  }, [session?.user?.id])

  useEffect(() => {
    fetchUserJobs()
  }, [fetchUserJobs])

  useEffect(() => {
    const fetchActiveJobs = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/active`)
      const result = await res.json()
      setActiveJobs(result.data)
    }
    if (session?.user?.id) {
      fetchActiveJobs()
    }
  }, [session])

  const fetchApplications = useCallback(async () => {
    if (session?.user?.id) {
      const res = await fetch(`/api/users/${session.user.id}/applications`)
      const result = await res.json()
      const data = result.data
      setApplications(data)
      const rejectedApplications = data.filter((d) => d.status === 'Rejected')
      setRejected(rejectedApplications)
    }
  }, [session?.user?.id]) // only re-create if user id changes

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  const filterTable = (value) => {
    const filtered = applications.filter((application) => application.job.title === value)
    setApplications(filtered)
  }
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (session?.user?.id) {
        const res = await fetch(`/api/users/${session.user.id}/bookmarks`)
        const result = await res.json()
        setBookmarks(result.data)
      }
    }

    fetchBookmarks()
  }, [session])

  useEffect(() => {
    const getUserDetails = async () => {
      if (session?.user?.id) {
        const res = await fetch(`/api/users/${session?.user?.id}`)
        const result = await res.json()
        setUser(result.data)
      }
    }

    getUserDetails()
  }, [session])

  const changeStatus = async (response, application) => {
    const res = await fetch(`/api/jobs/${application?.job.id}/response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: response,
        jobId: application?.job.id,
        userEmail: application?.user.email,
      }),
    })
    const result = await res.json()
    if (result.success) {
      toast.success('Status changed successfully!')
      fetchApplications()
    } else {
      throw new Error(result.error || 'Something went wrong')
    }
  }

  const searchJobs = async (value) => {
    const res = await fetch('/api/jobs')
    const result = await res.json()
    const data = result.data
    const searched = data.filter(
      (job) =>
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.company.toLowerCase().includes(value.toLowerCase())
    )
    setJobSearch("")
    setPostedJobs(searched)
  }

  return (
    <RoleContext.Provider
      value={{
        fetchJobs,
        jobSearch,
        setJobSearch,
        searchJobs,
        loading,
        postedJobs,
        setPostedJobs,
        user,
        saving,
        setSaving,
        fetchUserJobs,
        userJobs,
        activeJobs,
        chartData,
        applications,
        rejected,
        filterTable,
        searchedTitle,
        setSearchedTitle,
        bookmarks,
        pieData,
        userDetails,
        setUserDetails,
        employerDetails,
        setEmployerDetails,
        saveDetails,
        changeStatus,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export { RoleContext, RoleProvider }
