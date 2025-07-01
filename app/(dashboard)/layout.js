import Sidebar from '@components/Sidebar.jsx'
import { useSession, SessionProvider } from 'next-auth/react'
import { RoleProvider } from '@app/context'
import './dashboard.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata = {
  title: 'Job8/2You',
  description: 'A job board for Tech jobs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f7f7f7]">
        <SessionProvider>
          <RoleProvider>
            <div className="flex font-serif px-[20px] py-[10px] justify-evenly">
              <Sidebar />
              <div className='sm:w-[75%] w-[80%] sm:ml-[25%] ml-[20%]'>{children}</div>
              <ToastContainer autoClose={2000} position = 'top-center'/> 
            </div>
          </RoleProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
