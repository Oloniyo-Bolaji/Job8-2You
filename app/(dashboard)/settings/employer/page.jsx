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

const EmployerSettings = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { employerDetails, setEmployerDetails, saveDetails, saving, setSaving } =
    useContext(RoleContext)

  useEffect(() => {
    const fetchDetails = async () => {
      if (!session?.user?.id) return

      try {
        const res = await fetch(`/api/users/${session.user.id}`)
        const result = await res.json()

        if (result.success && result.data) {
          const data = result.data

          setEmployerDetails({
            companylocation: data.companylocation || '',
            year: data.year || '',
            description: data.description || '',
            contactEmail: data.contactEmail || '',
            websiteUrl: data.websiteUrl || '',
            address: data.address || '',
            linkedIn: data.linkedIn || '',
            x: data.x || '',
            instagram: data.instagram || '',
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
      <div className="flex flex-col gap-[10px] ">
        <div className="">
          <label className="text-[15px]">Name</label>
           <input
            value={session?.user?.name}
            readOnly
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
            type="text"
          />
        </div>
        <div className="relative">
          <label className="text-[15px]">Email</label>
          <input
            value={session?.user?.email}
            readOnly
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
            type="text"
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">
            Location
          </label>
          <input
            value={employerDetails.companylocation}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, companylocation: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] pt-[5px] pl-[5px] pb-[10px] w-full outline-[0] "
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">
            Year Founded
          </label>
          <input
            value={employerDetails.year}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, year: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">
            Company Description
          </label>
          <textarea
            value={employerDetails.description}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, description: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[5px] w-full outline-[0] h-[100px]"
          ></textarea>
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">
            Address
          </label>
          <input
            value={employerDetails.address}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, address: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc] ">
            Contact email
          </label>
          <input
            value={employerDetails.contactEmail}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, contactEmail: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">
            Website URL
          </label>
          <input
            value={employerDetails.websiteUrl}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, websiteUrl: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">
            X
          </label>
          <input
            type="text"
            value={employerDetails.x}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, x: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0]  "
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">
            LinkedIn
          </label>
          <input
            type="text"
            value={employerDetails.linkedIn}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, linkedIn: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
          />
        </div>
        <div className="relative">
          <label className="text-[15px] text-[#ccc]">
            Instagram
          </label>
          <input
            type="text"
            value={employerDetails.instagram}
            onChange={(e) => {
              setEmployerDetails({ ...employerDetails, instagram: e.target.value })
            }}
            className="border-black border-solid border-[1px] rounded-[5px] p-[10px] w-full outline-[0] "
          />
        </div>
        <div className="m-auto">
          <button
            onClick={saveDetails}
            className="w-[80px] bg-[#007bff] text-[white] border-[0] rounded-[5px] p-[5px]"
          >
            {saving ? <Loading /> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployerSettings
