'use client'

import Header from '@components/Header.jsx'
import '../../globals.css'
import JobForm from '@components/JobForm'

const Create = () => {
  return (
    <div className="create">
      <Header />
      <main className='w-full sm:px-[50px] py-[20px] px-[10px]'>
        <h2 className='text-[20px] font-bold text-center'>Post Job Vacancy</h2>
        <JobForm />
      </main>
    </div>
  )
}

export default Create
