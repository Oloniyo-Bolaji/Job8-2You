'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import './styles.css'
import { IoMdSettings, IoMdHome } from 'react-icons/io'
import { FaBookmark } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg'
import { MdSpaceDashboard } from 'react-icons/md'
import { IoMdBriefcase } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { useContext } from 'react'
import { RoleContext } from '@app/context'

const Sidebar = () => {
  const { data: session } = useSession()
  const { user } = useContext(RoleContext)

  return (
    <aside className="sm:w-[25%] w-[20%] flex flex-col bg-[white] p-[10px] rounded-[10px] fixed h-screen top-[0] left-[0]">
      <div className="w-full h-[20%] flex justify-center items-center">
        <div className="text-center">
          <Link href="/" className="font-bold text-[24px] text-[black] no-underline">
          <IoMdHome className="sm:hidden block text-[30px] text-[#007bff]"/>
            <p className="sm:block hidden">             
              Jobs<span className=" text-[#007bff]">8/2</span>You
            </p>
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col gap-[25px]">
        <li className="list-none">
          <Link
            href={`/dashboard/${user.role}`}
            className="hover:bg-[#007bff10] flex items-center sm:justify-start justify-center text-[#007bff] text-[30px] gap-[8px] p-[5px] sm:text-[20px]"
          >
            <MdSpaceDashboard />
            <span className="sm:block hidden">Dashboard</span>
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={`/profile/${user.role}`}
            className="hover:bg-[#007bff10]  flex items-center sm:justify-start justify-center text-[#007bff] text-[30px] gap-[8px] p-[5px] sm:text-[20px]"
          >
            <CgProfile />
            <span className="sm:block hidden">
              {user.role === 'employer' ? 'Company Profile' : 'Profile'}
            </span>
          </Link>
        </li>
        {user.role === 'employee' ? (
          <li className="list-none">
            <Link
              href="/bookmarks"
              className="hover:bg-[#007bff10]  flex sm:justify-start justify-center text-[30px] text-[#007bff] items-center gap-[8px] p-[5px] sm:text-[20px]"
            >
              <FaBookmark />
              <span className="sm:block hidden">Bookmarks</span>
            </Link>
          </li>
        ) : (
          <li className="list-none">
            <Link
              href="/jobs"
              className="hover:bg-[#007bff10]  flex sm:justify-start justify-center text-[30px] text-[#007bff] items-center gap-[8px] p-[5px] sm:text-[20px]"
            >
              <IoMdBriefcase />
              <span className="sm:block hidden">Jobs</span>
            </Link>
          </li>
        )}
        <li className="list-none">
          <Link
            href={`/settings/${user.role}`}
            className="hover:bg-[#007bff10]  flex items-center sm:justify-start justify-center text-[#007bff] text-[30px] gap-[8px] p-[5px] sm:text-[20px]"
          >
            <IoMdSettings />
            <span className="sm:block hidden">Settings</span>
          </Link>
        </li>
        <li className="list-none">
          <Link
            href=""
            onClick={() => signOut({ callbackUrl: '/' })}
            className="hover:bg-[#007bff10] flex items-center text-center sm:justify-start text-[#007bff] justify-center text-[30px] gap-[8px] p-[5px] sm:text-[20px]"
          >
            <IoLogOut className="text-center" />
            <span className="sm:block hidden">LogOut</span>
          </Link>
        </li>
      </div>
    </aside>
  )
}

export default Sidebar
