'use client'

import { useEffect } from 'react'
import { useAuthStore } from "@/store/authstore"
import { useRouter } from "next/navigation"
import { CircularProgress } from '@mui/material'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [hasHydrated, isAuthenticated, router])

  if (!hasHydrated) return <div className='flex h-screen items-center justify-center dark:text-white'><CircularProgress size={40} sx={{ color: '#2D439B' }} /></div>
  if (!isAuthenticated) return <div className='flex h-screen items-center justify-center dark:text-white'><CircularProgress size={40} sx={{ color: '#2D439B' }} /></div>

  return <div className="">{children}</div>
}
