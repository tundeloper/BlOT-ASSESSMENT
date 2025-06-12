"use client"
import ProtectedRoute from '@/components/protectedRoute'
import { useAuthStore } from '@/store/authstore'
import React from 'react'

export default function Home() {
  const state = useAuthStore()
  return (
    <ProtectedRoute>
      <div className='bg-pink-300'>{state.user?.username}</div>
      <div className='bg-pink-300'>{state.token}</div>
    </ProtectedRoute>
  )
}
