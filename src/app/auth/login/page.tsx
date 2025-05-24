import AuthCard from '@/components/auth/card'
import Link from 'next/link'
import React from 'react'

export default function Login() {
  return (
    <AuthCard>
        <h1 className="text-2xl font-bold mb-1 text-center">Login</h1>
        <p className="font-bold mb-6 text-center">
            Don't have an account?{" "} 
            </p>
            <Link href="/auth/register" className="text-blue-600 underline">
                Register
            </Link>
    </AuthCard>
  )
}
