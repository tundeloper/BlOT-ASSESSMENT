'use client'
import React from 'react'
import logo from '@/assets/logo2.png'
import Image from 'next/image'
import backIcon from '@/assets/backIcon.png'
import { useRouter } from 'next/navigation'
import { LinearProgress } from '@mui/material'

const AuthHeader: React.FC<{ showProgress?: boolean, progress?: number }> = ({ showProgress = false, progress = 0 }) => {
  const router = useRouter()
  return (
    <div className='flex justify-between items-center w-full px-6 md:px-16 py-5 md:py-7 absolute top-0 left-0 z-10'>
      <Image src={logo} alt='logo' width={75} height={50} className='cursor-pointer w-[48px] md:w-[75px] h-[32px] md:h-[50px]' onClick={() => router.push('/')} />
      {showProgress && <div className='flex items-center gap-2 w-[55%] md:w-[361px]'>
        <div className='w-[100%]'>
          <LinearProgress variant="determinate" value={progress} sx={{
            height: '10px',
            borderRadius: '10px',
            backgroundColor: '#D9D9D9',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#2D439B',
            },
          }} />
        </div>
        <div className='text-[13px] font-switzer text-[#7A7F8C]'>
          <p>{progress}%</p>
        </div>
      </div>}
      <Image src={backIcon} alt='back' width={32} height={32} className='cursor-pointer w-[24px] h-[24px] md:w-[32px] md:h-[32px]' onClick={() => router.back()} />
    </div>
  )
}

export default AuthHeader