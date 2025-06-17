'use client'
import React from 'react'
import Image from 'next/image'
import backIcon from '@/assets/backIcon.png'
import ScoreLeague from './ScoreLeague'
import { useRouter } from 'next/navigation'

const AllLiveScore = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col gap-4 bg-inherit md:bg-white rounded p-0 md:p-4 h-[86vh] overflow-y-auto scrollbar-hide pb-6 md:pb-4'>
      <button className='cursor-pointer' onClick={() => router.back()}>
        <Image src={backIcon} alt='back' width={24} height={24} />
      </button>
      <div>
        <ScoreLeague leagueName='Premier League' country='England' leagueLogo='https://ui-avatars.com/api/?name=PL&background=3A3D46&color=fff&size=32' />
        <ScoreLeague leagueName='La Liga' country='Spain' leagueLogo='https://ui-avatars.com/api/?name=PL&background=3A3D46&color=fff&size=32' />
        <ScoreLeague leagueName='Bundesliga' country='Germany' leagueLogo='https://ui-avatars.com/api/?name=PL&background=3A3D46&color=fff&size=32' />
      </div>
    </div>
  )
}

export default AllLiveScore