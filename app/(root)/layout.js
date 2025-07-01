import Navbar from '@components/Navbar.jsx'
import { useSession, SessionProvider } from 'next-auth/react'
import '../globals.css'
import { RoleProvider } from '@app/context'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata = {
  title: 'Job8/2You',
  description: 'A job board for Tech jobs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-serif w-full">
        <SessionProvider>
          <RoleProvider>
            <Navbar />
            {children}
            <ToastContainer autoClose={2000} position = 'top-center'/> 
          </RoleProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
