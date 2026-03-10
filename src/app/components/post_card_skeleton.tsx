import React from 'react'

export function PostCardSkeleton() {
    return (
        <div className='bg-white rounded-lg shadow-2xl p-4 mb-4 animate-pulse'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col mb-4 w-full'>
                    <div className='flex items-center justify-start gap-2 mb-2'>
                        {/* Avatar */}
                        <div className='rounded-full w-16 h-16 bg-gray-200 shrink-0 mb-2' />
                        {/* Name */}
                        <div className='h-5 bg-gray-200 rounded w-36' />
                    </div>
                    {/* Date */}
                    <div className='h-3 bg-gray-200 rounded w-24' />
                </div>
            </div>
            {/* Title */}
            <div className='h-5 bg-gray-200 rounded w-3/4 mb-3' />
            {/* Content lines */}
            <div className='space-y-2'>
                <div className='h-4 bg-gray-200 rounded' />
                <div className='h-4 bg-gray-200 rounded w-5/6' />
                <div className='h-4 bg-gray-200 rounded w-4/6' />
            </div>
        </div>
    )
}