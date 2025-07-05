'use client'

import { Skeleton } from '@mui/material'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const userProfileProfile = () => {
  const params = useParams()
  const router = useRouter()
  const id = params.id
  const [user, setUser] = useState({})
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const getuserProfile = async () => {
      const response = await fetch(`/api/users/${id}`)
      const result = await response.json()
      setUser(result.data)
      setloading(false)
    }
    getuserProfile()
  }, [id])

  return (
    <>
      {loading ? (
        <div className="w-full flex sm:flex-row flex-col gap-[10px] h-full">
          <aside className="sm:w-[35%] w-[100%] rounded-[10px] h-full">
            <div className="flex justify-center items-center flex-col p-[30px]">
              <Skeleton variant="circular" width={200} height={200} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '200px' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '150px' }} />
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
        <div className="w-full py-[20px] px-[40px]  h-full">
          <div>
            <button onClick={() => router.back()}>Back</button>
          </div>
          <div className='flex sm:flex-row flex-col gap-[10px]'>
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
                {user.role === 'employee' ? (
                  <div className="flex justify-between p-[5px] items-center border-b-[1px] border-b-[black] border-solid">
                    <label className="text-[15px] font-bold">Resume </label>
                    <a
                      href={user.resumeURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[blue]"
                    >
                      {user.resumeURL ? user.resumeURL : '-'}
                    </a>
                  </div>
                ) : (
                  <div className="flex justify-between p-[5px] items-center border-b-[1px] border-b-[black] border-solid">
                    <label className="text-[15px] font-bold">Website URL</label>
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[blue]"
                    >
                      {user.website ? "Website" : ''}
                    </a>
                  </div>
                )}
                <div className="flex justify-between p-[5px] items-center border-b-[1px] border-b-[black] border-solid">
                  <label className="text-[15px] font-bold">X</label>
                  <a
                    href={user.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[blue]"
                  >
                    {user.x ? "X" : ''}
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
                    {user.instagram ? "Instagram" : ''}
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
                    {user.linkedIn ? "LinkedIn" : ''}
                  </a>
                </div>
              </div>
            </aside>
            <section className="sm:w-[65%] w-[100%] bg-[white] rounded-[10px] gap-[5%] px-[20px] h-full">
              {user.role === 'employee' ? (
                <main className="flex flex-col h-[80%] w-full gap-[10px] py-[20px]">
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Name</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.name}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Email</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.email}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Headline</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.headline}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Bio</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.bio}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Skills</label>
                    <p className="sm:w-[70%] text-[#007bff] text-[15px]">
                      {user.skills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </p>
                  </div>
                </main>
              ) : (
                <main className="flex flex-col h-[80%] w-full gap-[10px] py-[20px]">
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Name</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.name}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Email</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.email}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Address</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.address}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Description</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.description}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Location</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.companyLocation}</p>
                  </div>
                  <div className="flex gap-[10px] sm:flex-row flex-col">
                    <label className="sm:w-[25%]  font-bold">Year Founded</label>
                    <p className="sm:w-[70%] text-[15px] text-[#007bff]">{user.year}</p>
                  </div>
                </main>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default userProfileProfile
