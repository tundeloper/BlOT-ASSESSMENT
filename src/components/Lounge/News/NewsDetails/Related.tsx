import React from 'react'
import { NewsItem } from '../NewsList'

const Related = () => {
    return (
        <div className='mt-8'>
            <h1 className='text-[13px] md:text-[16px] font-normal text-[#3A3D46] dark:text-white'>Related</h1>
            <div>
                {
                    Array.from({ length: 2 }).map((_, index) => (
                        <NewsItem key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Related