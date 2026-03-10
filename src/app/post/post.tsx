'use client';

import React, { useEffect, useState } from 'react'
import { PostProps } from '../types/post'
import PostsCards from '../components/posts_cards'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { useSession } from 'next-auth/react';
import { fetchPosts, selectPostParams, selectPosts } from '../store/slices/postSlice';
import { selectReload } from '../store/slices/reloadSlice';

export default function Post() {

    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession()
    const posts: PostProps[] = useSelector(selectPosts)
    const reload = useSelector(selectReload)
    const params = useSelector(selectPostParams)

    const handleFetchPosts = async () => {
        if (session?.user?.accessToken) {
            await dispatch(fetchPosts({ token: session.user.accessToken, params }));
        }
    }

    useEffect(() => {
        handleFetchPosts();
    }, [session, reload, params])


    return (
        <div className='flex flex-col mx-auto px-4 py-8 h-1/2 w-full max-w-2xl'>
            {
                posts && posts.map((post) => (
                    <PostsCards key={post.id} post={post} />
                ))
            }
        </div>
    )
}