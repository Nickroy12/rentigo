import DashboardSidebar from '@/ui/DashboardSidebar';
import React, { ReactNode } from 'react'


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    // pt-20 দেওয়ায় নেভবারের নিচে পারফেক্টলি জায়গা তৈরি হবে এবং সাইডবার নিচে নামবে
    <div className='flex pt-19 min-h-screen'>
        <DashboardSidebar />
        
        <main className='flex-1 p-4 md:p-6 overflow-x-hidden'>
           {children}
        </main>
    </div>
  )
}

export default Layout