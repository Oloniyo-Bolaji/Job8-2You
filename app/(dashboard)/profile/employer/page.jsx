'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/react'
import '../../dashboard.css'
import { RoleContext } from '@app/context'
import { Skeleton } from '@mui/material'

const EmployerProfile = () => {
  const { data: session } = useSession()
  const { user } = useContext(RoleContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [user])

  return (
    <div>
      {loading ? (
        <div className="w-full flex sm:flex-row flex-col gap-[10px] h-full">
          <aside className="sm:w-[35%] w-[100%] rounded-[10px] h-full">
            <div className="flex justify-center items-center flex-col p-[30px]">
              <Skeleton variant="circular" width={200} height={200} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width : "200px" }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width : "150px"  }} />
            </div>
            <div className="w-full p-[10px] h-[50%] flex flex-col gap-[5px]">
              <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
              <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
              <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
              <Skeleton variant="rectangular" sx={{ width: '100%' }} height={50} />
            </div>
          </aside>
          <section className="sm:w-[65%] w-[100%] rounded-[10px] gap-[5%] px-[20px]">
            <Skeleton variant="rounded" sx={{ width: '100%' }} height={300} />
          </section>
        </div>
      ) : (
        <div className="w-full flex sm:flex-row flex-col gap-[10px] h-full">
          <aside className="sm:w-[35%] w-[100%] bg-[white] rounded-[10px] h-full">
            <div className="flex justify-center items-center flex-col p-[30px]">
              {user.image && (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              )}
              <p className="font-bold text-[18px] text-center">{user.name}</p>
              <p className="text-center">{user.email}</p>
            </div>
            <div className="w-full p-[10px] h-[50%]">
              <div className="flex justify-between p-[5px] items-center border-b-[1px] border-b-[black] border-solid">
                <label className="text-[15px] font-bold">Website URL </label>
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[blue]"
                >
                  {user.website}
                </a>
              </div>
              <div className="flex justify-between p-[5px] items-center border-b-[1px] border-b-[black] border-solid">
                <label className="text-[15px] font-bold">X</label>
                <a
                  href={user.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[blue]"
                >
                  {user.x}
                </a>
              </div>
              <div className="flex justify-between p-[5px] items-center border-b-[1px] border-b-[black] border-solid">
                <label className="text-[15px] font-bold">Insatgram</label>
                <a
                  href={user.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[blue]"
                >
                  {user.instagram}
                </a>
              </div>
              <div className="flex justify-between p-[5px] items-center border-b-[1px] border-b-[black] border-solid">
                <label className="text-[15px] font-bold">LinkedIn</label>
                <a
                  href={user.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[blue]"
                >
                  {user.linkedIn}
                </a>
              </div>
            </div>
          </aside>
          <section className="sm:w-[65%] w-[100%] bg-[white] rounded-[10px] gap-[5%] px-[20px]">
            <header className="flex justify-between items-center h-[15%] w-full">
              <h3 className="font-bold text-[30px]">Profile</h3>
              <Link
                href="/settings/employee"
                className="bg-[#007bff] p-[5px] text-[13px] text-[white] rounded-[5px]"
              >
                Edit Profile
              </Link>
            </header>
            <main className="flex flex-col h-[80%] w-full gap-[10px]">
              <div className="flex gap-[10px]">
                <label className="w-[25%] font-bold">Name</label>
                <p className="w-[70%] text-[15px] text-[#007bff]">{user.name}</p>
              </div>
              <div className="flex gap-[10px]">
                <label className="w-[25%] font-bold">Email</label>
                <p className="w-[70%] text-[15px] text-[#007bff]">{user.email}</p>
              </div>
              <div className="flex gap-[10px]">
                <label className="w-[25%] font-bold">Address</label>
                <p className="w-[70%] text-[15px] text-[#007bff]">{user.address}</p>
              </div>
              <div className="flex gap-[10px]">
                <label className="w-[25%] font-bold">Description</label>
                <p className="w-[70%] text-[15px] text-[#007bff]">{user.description}</p>
              </div>
              <div className="flex gap-[10px]">
                <label className="w-[25%] font-bold">Location</label>
                <p className="w-[70%] text-[15px] text-[#007bff]">{user.companyLocation}</p>
              </div>
              <div className="flex gap-[10px]">
                <label className="w-[25%] font-bold">Year Founded</label>
                <p className="w-[70%] text-[15px] text-[#007bff]">{user.year}</p>
              </div>
            </main>
          </section>
        </div>
      )}
    </div>
  )
}

export default EmployerProfile
