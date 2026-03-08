import React from 'react'
import { PostProps } from '../types/post'
import Image from 'next/image'

type Props = {
    post: PostProps
}

export default function PostsCards({ post }: Props) {

    return (
        <div className='bg-white rounded-lg shadow-2xl p-4 mb-4'>
            <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
            <p className='text-gray-700'>{post.content}</p>
            <img src={post.url_image} alt={post.title} className='w-full h-auto mt-4 rounded' />
        </div>
    )
}