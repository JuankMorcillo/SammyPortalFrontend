'use client';

import React, { useState } from 'react'
import { PostProps } from '../types/post'
import Image from 'next/image'
import { formatDateLikeFacebook } from '@/src/lib/utils/dateFormatter'
import Icons from './ui/hooks/Icons';
import Modal from './modal';
import EditPost from '../post/edit/page';

type Props = {
    post: PostProps,
    edit?: boolean
}

export default function PostsCards({ post, edit }: Props) {

    const { pencilIcon } = Icons({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })
    const [modalUpdate, setModalUpdate] = useState(false)

    return (
        <div className='bg-white rounded-lg shadow-2xl p-4 mb-4'>

            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col mb-4'>
                    <div className='flex items-center justify-start gap-2'>
                        <div className='rounded-full overflow-hidden w-16 h-16 mb-2'>
                            <img src={post.user?.avatar} />
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{post.user?.first_name} {post.user?.last_name}</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-sm text-gray-500'>{formatDateLikeFacebook(post.created_at || '')}</p>
                    </div>
                </div>

                {
                    edit && <div className='flex justify-end mb-2'>
                        <button onClick={() => setModalUpdate(true)} className='flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors duration-300'>
                            {pencilIcon} <span className='font-semibold'>Edit</span>
                        </button>
                    </div>
                }
            </div>

            <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
            <p className='text-gray-700'>{post.content}</p>
            {
                post.url_image && <img src={post.url_image} alt={post.title} className='w-full h-auto mt-4 rounded' />
            }

            <Modal
                title={'Edit Post'}
                open={modalUpdate}
                setOpen={setModalUpdate}
                children={
                    <EditPost post={post} />
                }
                x_icon={true}
            />
        </div>
    )
}