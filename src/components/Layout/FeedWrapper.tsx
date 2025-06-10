'use client'
import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

const FeedWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className='w-[100%]'>
      <Header onSidebarOpen={() => setIsSidebarOpen(true)} />
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {children}
      <BottomNav />
    </div>
  )
}

export default FeedWrapper