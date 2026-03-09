'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { useSession } from 'next-auth/react';
import { clearProcessMessagePosts, createPostSlice, selectLoadingPosts, selectProcessMessagePosts, selectSuccessPost, setSuccessPost } from '../../store/slices/postSlice';
import Icons from '../../components/ui/hooks/Icons';
import { PostProps } from '../../types/post';
import { fillToastInfo } from '../../store/slices/toastSlice';
import { triggerReload } from '../../store/slices/reloadSlice';
import Forms from '../../components/form';

export default function CreatePost() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectLoadingPosts)
    const message = useSelector(selectProcessMessagePosts)
    const success = useSelector(selectSuccessPost)

    const { successIcon } = Icons({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Icons({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const [info, setInfo] = useState<PostProps>()

    const inputs: Inputs = [
        {
            id: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'Your post title',
            required: true
        },
        {
            id: 'content',
            label: 'Content',
            type: 'text',
            placeholder: 'What do you want to share?',
            required: true
        },
        {
            id: 'url_image',
            label: 'Image URL',
            type: 'text',
            placeholder: 'An optional image to share in your post',
            required: false
        },
    ]

    const styles = {
        cols: 1,
        textButton: 'Save Post',
    }

    const handleCreatePost = async () => {
        if (session?.user.token) {

            const postData: PostProps = {
                title: info?.title || '',
                content: info?.content || '',
                url_image: info?.url_image,
                authorUserId: session.user.user_id 
            }                        

            const result = await dispatch(
                createPostSlice({ post: postData as PostProps })
            )

            if (result.type == 'posts/createPost/fulfilled') {
                setInfo(undefined)
            }            
        }
    }

    useEffect(() => {

        if (message) {
            dispatch(fillToastInfo({
                id: new Date().getTime().toString(),
                message: message || 'Post created successfully',
                position: 'top-right',
                icon: success ? successIcon : circleXMarkIcon,
                duration: 3000,
            }))
            dispatch(clearProcessMessagePosts())
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccessPost(false))

    }, [message, success])

    useEffect(() => {
        if (info) handleCreatePost()
    }, [info])

    return (
        <div className='flex justify-center'>
            <Forms inputs={inputs} setInfo={setInfo} styles={styles} submitting={loading} />
        </div>
    )
}