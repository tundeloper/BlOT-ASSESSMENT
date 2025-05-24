import AuthCard from '@/components/auth/card'
import { Button, Link } from '@mui/material'
import React from 'react'

export default function index() {
  return (
    <AuthCard>
       <h2 className="text-gray-800 dark:text-white font-semibold text-lg mb-6">
          Experience Sports Like Never Before
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 mb-4">
          <Button
            component="a"
            variant='contained'
            color='primary'
            href="/home"
            style={{ textTransform: 'none',  backgroundColor: "#463a85"}}
            className="px-4 py-2 rounded-md bg-p bg-primary text-white hover:bg-blue-700 text-sm font-medium transition"
          >
            Get Started
          </Button>
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium transition"
          >
            Login
          </Link>
        </div> 
    </AuthCard>
  )
}
