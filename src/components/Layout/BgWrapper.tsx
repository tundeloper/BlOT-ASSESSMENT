import React from 'react'
import Image from 'next/image'
import topLeftIcon from '@/assets/topLeftIcon.png'
import bottomRightIcon from '@/assets/bottomRightIcon.png'
import bottomLeftIcon from '@/assets/bottomLeftIcon.png'
import topRightIcon from '@/assets/topRightIcon.png'
import middleRightIcon from '@/assets/middleRightIcon.png'
import middleLeftIcon from '@/assets/middleLeftIcon.png' 
// import { useTheme } from '@/context/ThemeContext'

const BgWrapper = ({ children }: { children: React.ReactNode }) => {
  // const {theme} = useTheme()
  return (
    <div className='bg-primary h-auto w-[100%] relative overflow-y-scroll overflow-x-hidden lg:h-screen'>
        <Image src={topLeftIcon} alt="topLeftIcon" className='absolute top-0 left-0 opacity-50 hidden md:block' />
        <Image src={bottomRightIcon} alt="bottomRightIcon" className='absolute bottom-0 right-0 opacity-50 hidden md:block' />
        <Image src={bottomLeftIcon} alt="bottomLeftIcon" className='absolute bottom-0 left-0 opacity-50 hidden md:block' />
        <Image src={topRightIcon} alt="topRightIcon" className='absolute top-0 right-0 opacity-50 hidden md:block' />
        <Image src={middleRightIcon} alt="middleRightIcon" className='absolute top-[45%] right-10 opacity-50 hidden md:block' />
        <Image src={middleLeftIcon} alt="middleLeftIcon" className='absolute top-[45%] left-10 opacity-50 hidden md:block' />
        {children}
    </div>
  )
}

export default BgWrapper