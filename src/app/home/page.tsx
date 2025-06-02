"use client"
import ProtectedRoute from '@/components/protectedRoute'
import { useAuthStore } from '@/store/authstore'
import React from 'react'

export default function Home() {
  const user = useAuthStore((s) => s.user)
  return (
    <ProtectedRoute>
      <div>{user?.name}</div>
    </ProtectedRoute>
  )
}
