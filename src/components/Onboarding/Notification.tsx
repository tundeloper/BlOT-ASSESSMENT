'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/assets/logo2.png'
import { Switch } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Notification = () => {
  const router = useRouter()

  const [matchStartReminders, setMatchStartReminders] = useState(false)
  const [teamNews, setTeamNews] = useState(false)
  const [weeklyChallenge, setWeeklyChallenge] = useState(false)
  const [leaderboardUpdate, setLeaderboardUpdate] = useState(false)

  const handleNext = () => {
    const notificationPrefs = {
      match_start_reminders: matchStartReminders,
      team_news: teamNews,
      weekly_challenge: weeklyChallenge,
      leaderboard_update: leaderboardUpdate,
    }

    console.log(notificationPrefs)
    // You can POST `notificationPrefs` to an API here if needed
    router.push('/onboarding/welcome')
  }

  return (
    <div className="md:max-w-[550px] w-full md:bg-white rounded flex flex-col items-center gap-1 p-8 md:shadow-card mt-[50%] md:mt-2 dark:bg-[#121212] transition-colors duration-300">
      <div className="flex flex-col items-center gap-2 w-[427px] mb-7">
        <Image src={logo} alt="logo" width={114} height={76} className='w-[75px] md:w-[114px] h-[50px] md:h-[76px]' />
        <h1 className="font-[500] text-[20px] md:text-[25px] font-switzer leading-[1.32em] text-[#3A3D46] text-center dark:text-white">
          Notification Preferences
        </h1>
      </div>

      {/* Preferences Group 1 */}
      <div className='flex flex-col md:flex-row justify-between w-full md:items-center gap-4'>
        <div className='flex items-center justify-start w-[100%] md:w-[50%]'>
          <Switch
            checked={matchStartReminders}
            onChange={(e) => setMatchStartReminders(e.target.checked)}
          />
          <p>Match start reminders</p>
        </div>
        <div className='flex items-center justify-start w-[100%] md:w-[50%]'>
          <Switch
            checked={teamNews}
            onChange={(e) => setTeamNews(e.target.checked)}
          />
          <p>Team news</p>
        </div>
      </div>

      {/* Preferences Group 2 */}
      <div className='flex flex-col md:flex-row justify-between w-full md:items-center gap-4'>
        <div className='flex items-center justify-start w-[100%] md:w-[50%]'>
          <Switch
            checked={weeklyChallenge}
            onChange={(e) => setWeeklyChallenge(e.target.checked)}
          />
          <p>Weekly challenges</p>
        </div>
        <div className='flex items-center justify-start w-[100%] md:w-[50%]'>
          <Switch
            checked={leaderboardUpdate}
            onChange={(e) => setLeaderboardUpdate(e.target.checked)}
          />
          <p>Leaderboard updates</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row w-full gap-4 mt-7">
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center h-[50px] bg-[#2D439B] hover:bg-[#2D439B]/80 transition-all duration-300 cursor-pointer font-switzer text-white rounded shadow-md font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.04)' }}
        >
          Next
        </button>
        <Link
          className="flex-1 flex items-center justify-center h-[50px] bg-[#D9D9D9] hover:bg-[#D9D9D9]/80 transition-all duration-300 cursor-pointer font-switzer text-[#3A3D46] rounded shadow font-normal text-[16px] leading-[1.5em]"
          style={{ boxShadow: "0px 2px 0px 0px rgba(0,0,0,0.02)" }}
          href='/onboarding/welcome'
        >
          Skip
        </Link>
      </div>
    </div>
  )
}

export default Notification
