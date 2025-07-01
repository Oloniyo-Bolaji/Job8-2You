import { RoleProvider } from '@app/context';
import Sidebar from '@components/Sidebar.jsx';
import { useSession, SessionProvider } from 'next-auth/react';



export const metadata = {
  title: 'Job8/2You',
  description: 'A job board for Tech jobs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-[#007bff10]'>
        <div className="font-serif flex justify-center items-center min-h-screen">
          <SessionProvider>
            <RoleProvider>
             {children} 
            </RoleProvider>
         </SessionProvider>
        </div>
      </body>
    </html>
  );
}