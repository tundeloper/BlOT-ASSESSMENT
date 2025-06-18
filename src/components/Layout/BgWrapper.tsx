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
<div className='bg-primary w-full relative min-h-screen overflow-x-hidden md:min-h-0 md:h-screen md:overflow-y-auto md:my-auto dark:bg-[#121212] md:dark:bg-[#1e1e1e] transition-colors duration-300'>
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