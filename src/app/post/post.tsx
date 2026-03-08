import React from 'react'
import { PostProps } from '../types/post'
import PostsCards from '../components/posts_cards'

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


    return (
        <div className='flex flex-col mx-auto px-4 py-8 h-1/2 w-full max-w-2xl'>
            {
                PostExpample.map((post) => (
                    <PostsCards key={post.id} post={post} />
                ))
            }
        </div>
    )
}