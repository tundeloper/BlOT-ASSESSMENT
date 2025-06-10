'use client'

import { useEffect } from 'react'
import { useAuthStore } from "@/store/authstore"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [hasHydrated, isAuthenticated, router])

  if (!hasHydrated) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Redirecting to login...</div>

  return <div className="mr-[-23px] h-[100rem]">{children}</div>
}
