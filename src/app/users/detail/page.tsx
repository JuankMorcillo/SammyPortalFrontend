import React from 'react'

type Props = {
    user: {
        first_name: string;
        last_name: string;
        email: string;
        avatar: string;
    }
}

export default function UserDetail({ user }: Props) {

    return (
        <>
            <div className='flex flex-col items-center gap-4 w-full'>
                <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className='w-32 h-32 rounded-full' />
                <h2 className='text-2xl font-bold'>{user.first_name} {user.last_name}</h2>
                <p className='text-gray-600'>{user.email}</p>
            </div>
        </>
    )
}