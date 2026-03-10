'use client';

import React, { useEffect, useState } from 'react'
import { PostProps } from '../types/post'
import PostsCards from '../components/posts_cards'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { useSession } from 'next-auth/react';
import { fetchPosts, selectPostParams, selectPosts, selectLoadingPosts } from '../store/slices/postSlice';
import { selectReload } from '../store/slices/reloadSlice';
import { PostCardSkeleton } from '../components/post_card_skeleton';

export default function Post() {

    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession()
    const posts: PostProps[] = useSelector(selectPosts)
    const reload = useSelector(selectReload)
    const params = useSelector(selectPostParams)
    const loading = useSelector(selectLoadingPosts)

    const [showEmpty, setShowEmpty] = useState(false);
    const [emptyVisible, setEmptyVisible] = useState(false);

    const handleFetchPosts = async () => {
        if (session?.user?.accessToken) {
            await dispatch(fetchPosts({ token: session.user.accessToken, params }));
        }
    }

    useEffect(() => {
        handleFetchPosts();
    }, [session, reload, params])

    useEffect(() => {
        let delayTimer: ReturnType<typeof setTimeout>;
        let fadeTimer: ReturnType<typeof setTimeout>;

        if (!loading && posts.length === 0) {
            // Mantiene el skeleton ~1.5s después de cargar, luego hace fade-in del texto
            delayTimer = setTimeout(() => {
                setShowEmpty(true);
                fadeTimer = setTimeout(() => setEmptyVisible(true), 50);
            }, 1500);
        } else {
            setShowEmpty(false);
            setEmptyVisible(false);
        }

        return () => {
            clearTimeout(delayTimer);
            clearTimeout(fadeTimer);
        };
    }, [loading, posts.length]);

    const showSkeletons = loading || (!showEmpty && posts.length === 0);

    return (
        <div className='flex flex-col mx-auto px-4 py-8 h-1/2 w-full max-w-2xl'>
            {
                showSkeletons
                    ? [...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)
                    : posts.length > 0
                        ? posts.map((post) => (
                            <PostsCards key={post.id} post={post} />
                        ))
                        :
                        <div
                            style={{
                                opacity: emptyVisible ? 1 : 0,
                                transition: 'opacity 0.7s ease-in',
                            }}
                        >
                            <p className='text-center text-gray-500'>No posts found.</p>
                        </div>
            }
        </div>
    )
}