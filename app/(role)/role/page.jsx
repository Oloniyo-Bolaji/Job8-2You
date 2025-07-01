'use client'

import { useContext, useState } from 'react'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Role = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [role, setRole] = useState()
  const [loading, setLoading] = useState(false)

  const selectRole = async () => {
    if (!role || !session?.user?.email) return

    setLoading(true)

    const res = await fetch('/api/users/role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: role,
        userEmail: session.user.email,
      }),
    })

    const result = await res.json()

    if (result.success) {
      router.push(`/settings/${role}`)
    } else {
      alert(result.error || 'Failed to save role')
    }

    setLoading(false)
  }


  return (
    <div className="bg-[white] rounded-[10px] w-[400px] p-[20px]">
      <div className="flex flex-col gap-[10px]">
        <span className="text-center text-[15px] font-bold text-[#007bff]">
          Sign up as an Employer or an Employee?
        </span>
        <div className="border-[1px] border-[black] border-solid rounded-[5px] py-[5px] text-[15px] font-bold hover:bg-[#007bff10]">
          <label className="p-[5px] flex items-center gap-[5px]">
            <input
              type="radio"
              name="role"
              value="employee"
              checked={role === 'employee'}
              onChange={(e) => setRole(e.target.value)}
            />
            Employee
          </label>
        </div>
        <div className="border-[1px] border-[black] border-solid rounded-[5px] py-[5px] text-[15px] font-bold hover:bg-[#007bff10]">
          <label className="p-[5px] flex items-center gap-[5px]">
            <input
              type="radio"
              name="role"
              value="employer"
              checked={role === 'employer'}
              onChange={(e) => setRole(e.target.value)}
            />
            Employer
          </label>
        </div>

        <button
          onClick={selectRole}
          className="bg-[#007bff] p-[5px] rounded-[10px] text-[white] hover:bg-[white] hover:text-[#007bff] hover:border-[1px] hover:border-[#007bff] hover:border-solid"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default Role
