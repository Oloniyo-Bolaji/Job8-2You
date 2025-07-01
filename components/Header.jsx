'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import './styles.css'

const Header = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <header className="w-full h-[300px] bg-[url(/office.jpg)] bg-center bg-cover bg-no-repeat z-[1]">
      <div className="header h-full bg-[#2c3e5060] flex items-center justify-center flex-col gap-[5px] z-[2]">
        <p className="p-[5px] border-x-[0] border-y-[1.5px] border-y-[white] border-solid text-[18px] text-[white]">Find your Dream Tech Job, Stress free</p>
        <span className='text-[15px]'>Explore thousands of opportunities around you</span>
        <span className='text-[15px]'>Got vacancy?</span>
      </div>
    </header>
  )
}
export default Header
