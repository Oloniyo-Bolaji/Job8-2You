'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useContext } from 'react'
import { UploadButton } from '@uploadthing/react'
import '../../dashboard.css'
import { RoleContext } from '@app/context'
import Loading from '@components/Loading'
import Upload from '@components/Upload'

const EmployeeSettings = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { userDetails, setUserDetails, saveDetails, saving, setSaving } = useContext(RoleContext)

  useEffect(() => {
    const fetchDetails = async () => {
      if (!session?.user?.id) return

      try {
        const res = await fetch(`/api/users/${session.user.id}`)
        const result = await res.json()

        if (result.success && result.data) {
          const data = result.data

          setUserDetails({
            headline: data.headline || '',
            bio: data.bio || '',
            linkedIn: data.linkedIn || '',
            x: data.x || '',
            instagram: data.instagram || '',
            skills: data.skills || [],
            resumeURL: data.resumeURL || '',
          })
        }
      } catch (err) {
        console.error('Failed to load user details:', err)
      }
    }

    fetchDetails()
  }, [session])

  return (
    <div className="bg-[white] flex flex-col w-full rounded-[10px] h-full px-[20px] py-[10px]">
      <div className="flex items-center justify-center flex-col">
        <h3 className="font-bold text-[20px]">Public Profile</h3>
        <p>Add more information about yourself</p>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="">
          <label className="text-[15px] text-[#ccc]">Name</label>
          <p className="border-black border-solid border-[1px] rounded-[5px] w-full p-[10px]">
            {session?.user?.name}
          </p>
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">Email</label>
          <p className="border-black border-solid border-[1px] rounded-[5px] w-full p-[10px]">
            {session?.user?.email}
          </p>
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">Headline</label>
          <textarea
            value={userDetails.headline}
            onChange={(e) => {
              setUserDetails({ ...userDetails, headline: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[5px] w-full h-[100px] outline-[0] "
          ></textarea>
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">Bio</label>
          <textarea
            value={userDetails.bio}
            onChange={(e) => {
              setUserDetails({ ...userDetails, bio: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[5px] w-full h-[100px] outline-[0] "
          ></textarea>
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">Skill set</label>
          <textarea
            value={
              Array.isArray(userDetails.skills) ? userDetails.skills.join(', ') : userDetails.skills
            }
            placeholder="e.g. HTML, Node.js, PostgreSQL"
            onChange={(e) => {
              setUserDetails({ ...userDetails, skills: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[5px] w-full h-[100px] outline-[0] "
          ></textarea>
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">X</label>
          <input
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
            type="text"
            value={userDetails.x}
            onChange={(e) => {
              setUserDetails({ ...userDetails, x: e.target.value })
            }}
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">LinkedIn</label>
          <input
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0]  "
            type="text"
            value={userDetails.linkedIn}
            onChange={(e) => {
              setUserDetails({ ...userDetails, linkedIn: e.target.value })
            }}
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">Instagram</label>
          <input
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
            type="text"
            value={userDetails.instagram}
            onChange={(e) => {
              setUserDetails({ ...userDetails, instagram: e.target.value })
            }}
          />
        </div>
        <div>
          <label className="text-[15px] text-[#ccc]">Upload your resume</label>
          <Upload onSuccess={(resumeUrl) => setUserDetails({...userDetails, resumeURL: resumeUrl})} />
        </div>
        <div className="m-auto">
          <button
            className="w-[80px] bg-[#007bff] text-[white] border-[0] rounded-[5px] p-[5px]"
            onClick={saveDetails}
          >
            {saving ? <Loading /> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default EmployeeSettings
