'use client';

import React, { useEffect, useState } from 'react'
import { PostProps } from '../types/post'
import PostsCards from '../components/posts_cards'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useSession } from 'next-auth/react';
import { fetchPosts } from '../store/slices/postSlice';

const PostExpample: PostProps[] = [{
    id: 1,
    title: 'Post de ejemplo',
    content: 'Este es el contenido del post de ejemplo.',
    authorUserId: 1,
    url_image: 'https://media.tenor.com/OBtp1QjATpUAAAAe/vril-agartha.png'
},
{
    id: 2,
    title: 'Post de ejemplo 2',
    content: 'Este es el contenido del post de ejemplo 2.',
    authorUserId: 1,
    url_image: 'https://media.tenor.com/OBtp1QjATpUAAAAe/vril-agartha.png'
}
]

export default function Post() {

    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession()
    const [posts, setPosts] = useState<PostProps[]>()

    const handleFetchPosts = async () => {
        if (session?.user?.token) {
            const result = await dispatch(fetchPosts({ token: session.user.token }));
            if (result.type == 'posts/fetchPosts/fulfilled') {
                setPosts(result.payload);
            }
        }
    }

    useEffect(() => {
        handleFetchPosts();
    }, [session])


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