'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './styles.css'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState({})

  const handleLogin = async () => {
    await signIn('google', {
      callbackUrl: '/role',
    })
  }
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

  return (
    <nav className="flex justify-between items-center h-[70px] p-[30px] shadow-[2px_2px_4px_#007bff10]">
      <div className="logo">
        <Link href="/" className="font-bold text-[24px] text-[black] no-underline">
          Jobs<span className=" text-[#007bff]">8/2</span>You
        </Link>
      </div>
      <div className="links flex items-center">
        <div className='ml-[20px]'>
          <Link href="/browsejobs" className="uppercase hover:text-[#007bff] text-[15px]">
            Browse Jobs
          </Link>
        </div>
        {session?.user ? (
          <div className="flex items-center ml-[20px]">
            <Link href={`/profile/${session.user.role}`} className='flex gap-[10px] items-center hover:text-[#007bff]'>
              <span className='hidden sm:block'>My Account</span>
              <Image
                src={session.user?.image}
                alt="profile photo"
                width={25}
                height={25}
                priority
                className="block sm:hidden rounded-[50%] sm:ml-[10px]"
              />
            </Link>
          </div>
        ) : (
          <div className='ml-[20px]'>
            <button onClick={handleLogin} className="text-[15px] bg-[#007bff] text-[#fff] border-[0] py-[10px] px-[20px] cursor-pointer transition-colors duration-200 ease-in-out">
              SIGN IN
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
