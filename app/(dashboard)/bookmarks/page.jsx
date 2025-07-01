'use client'

import { RoleContext } from '@app/context'
import JobCard from '@components/JobCard'
import React, { useContext } from 'react'

const Bookmark = () => {
  const { bookmarks } = useContext(RoleContext)

  return (
    <div>
      {bookmarks && (
        <div className="rounded-[10px] w-full h-full sm:px-[20px] py-[10px] flex flex-col gap-[10px]">
          <div className="flex items-center justify-center bg-[white] w-full rounded-[10px]">
            <h1 className="font-bold text-[30px]">Bookmarked</h1>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-[10px] w-full">
            {bookmarks?.map((bookmark) => (
              <JobCard job={bookmark.job} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookmark
