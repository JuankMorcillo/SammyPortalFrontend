'use client';

import React, { useEffect, useState } from 'react'
import { PostProps } from '../../types/post'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { useSession } from 'next-auth/react';
import { clearProcessMessagePosts, selectLoadingPosts, selectProcessMessagePosts, selectSuccessPost, setSuccessPost, updatePostSlice } from '../../store/slices/postSlice';
import Icons from '../../components/ui/hooks/Icons';
import { fillToastInfo } from '../../store/slices/toastSlice';
import { triggerReload } from '../../store/slices/reloadSlice';
import Forms from '../../components/form';

type Props = {
    post: PostProps
}

export default function EditPost({ post = {
    id: 1,
    authorUserId: 1,
    title: 'Juan',
    content: 'juan',
    url_image: '',
} }: Props) {

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
        {
            id: 'status',
            label: 'Status',
            list: true,
            type: 'select',
            options: [
                { value: 1, label: 'Active' },
                { value: 0, label: 'Inactive' },
            ],
            required: true
        }
    ]

    const styles = {
        cols: 1,
        textButton: 'Update Post',
    }

    const handleUpdatePost = async () => {
        if (session?.user.token) {

            const postData: PostProps = {
                id: post.id,
                title: info?.title || '',
                content: info?.content || '',
                url_image: info?.url_image,
                authorUserId: session.user.user_id,
                status: info?.status
            }

            const result = await dispatch(
                updatePostSlice({ post: postData as PostProps })
            )

            if (result.type == 'posts/updatePost/fulfilled') {
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
        if (info) handleUpdatePost()
    }, [info])

    return (
        <div className='flex justify-center'>

            {
                post && <Forms data={post} inputs={inputs} setInfo={setInfo} styles={styles} submitting={loading} />
            }

        </div>
    )
}