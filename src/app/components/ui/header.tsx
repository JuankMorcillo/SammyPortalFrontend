'use client';

import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react'
import useUserInitials from '../../hooks/useUserInitials';
import Icons from './hooks/Icons';
import Modal from '../modal';
import { useRouter } from 'next/navigation';


export default function Header() {

  const { data: session } = useSession()
  const userEmail = session?.user?.email || '';
  const { color, initials } = useUserInitials({ email: userEmail || '' })
  const [open, setOpen] = useState(false)

  const { userIcon, usersIcon, logoutIcon, hashtagIcon } = Icons({ classNames: 'size-5', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

  const router = useRouter()

  const navigateTo = (href: string) => {
    router.push(href);
  }

  const options = [
    {
      id: 'my-posts',
      name: 'My posts',
      icon: hashtagIcon,
      href: '/posts/my-posts'
    },
    {
      id: 'users',
      name: 'Users',
      icon: usersIcon,
      href: '/users'
    }
  ]

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <>
      {session && <div className={`h-14 border-b border-gray-200 shadow-md w-full flex items-center 
            transition-all duration-500 ease-in-out
        justify-between px-6 py-4 bg-linear-to-br bg-white`}>

        <div className='ml-4 text-black font-bold text-lg'>
          Welcome back, {userEmail}!
        </div>

        <div className='flex items-center mr-4'>
          <button
            className="w-10 h-10 cursor-pointer rounded-full text-white font-bold text-lg shadow"
            style={{ backgroundColor: color }}
            onClick={() => setOpen(!open)}
          >
            {initials}
          </button>
        </div>

        <Modal
          open={open}
          setOpen={setOpen}
          children={
            <div className='flex flex-col gap-2'>
              <div className='flex justify-center border-b border-gray-200 cursor-default'>
                <span className='font-bold'>{userEmail}</span>
              </div>
              {
                options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => navigateTo(option.href)}
                    className='flex flex-row justify-center gap-2 mb-2 border-b border-gray-200 text-gray-500 cursor-pointer hover:bg-gray-300 rounded transition-colors duration-300'
                  >
                    {option.icon} <span className='font-semibold'>{option.name}</span>
                  </div>
                ))
              }
              <button className='flex items-center justify-center w-full bg-red-500 
                        text-white rounded p-2 cursor-pointer'
                onClick={handleLogout}
              >
                {logoutIcon} Cerrar sesión
              </button>
            </div>
          }
          classNames='w-50'
          position='right-1 z-50 top-14 h-auto'
        />

      </div>}
    </>
  )
}