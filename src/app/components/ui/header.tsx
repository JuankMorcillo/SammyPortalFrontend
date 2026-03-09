'use client';

import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react'
import useUserInitials from '../../hooks/useUserInitials';
import Icons from './hooks/Icons';
import Modal from '../modal';
import { usePathname, useRouter } from 'next/navigation';
import CreatePost from '../../post/create/page';
import toast, { Toaster } from 'react-hot-toast';
import { setPostParams } from '../../store/slices/postSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { PostParams } from '../../types/post';


export default function Header() {

  const { data: session } = useSession()
  const dispatch = useDispatch<AppDispatch>()
  const userEmail = session?.user?.email || '';
  const { color, initials } = useUserInitials({ email: userEmail || '' })
  const [open, setOpen] = useState(false)
  const [modalCreatePost, setModalCreatePost] = useState(false)

  const { plusIcon, usersIcon, logoutIcon, hashtagIcon } = Icons({ classNames: 'size-5', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

  const router = useRouter()

  const pathname = usePathname()

  const navigateTo = (href: string) => {
    router.push(href);
  }

  const searchPosts = (e: any) => {
    e.preventDefault();
    const query = e.target.value;

    if (query.length > 2 || query.length === 0) {
      let params: PostParams = {}

      if (pathname.includes('my-posts')) {
        params = {
          userName: session?.user?.name || '',
          title: query,
          order: 'DESC'
        }
        dispatch(setPostParams(params))
      } else {
        params = {
          userName: query,
          title: query,
          order: 'DESC'
        }
        dispatch(setPostParams(params))
      }
    }

  }

  const canCreatePosts = () => {
    if (session?.user.user_id) {
      setModalCreatePost(true);
    } else {
      toast.error('You must be registered locally to create posts');
    }
  }

  const options = [
    {
      id: 'my-posts',
      name: 'My posts',
      icon: hashtagIcon,
      href: '/post/my-posts'
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

        <div className='ml-4 text-black font-bold text-lg cursor-pointer' onClick={() => navigateTo('/')}>
          Welcome back, {userEmail}!
        </div>

        <div className='flex flex-1 items-center justify-center mr-20'>
          <input
            onKeyUp={searchPosts}
            className='w-200 border border-gray-300 rounded-md h-8 p-2 focus:border-gray-500 focus:outline-none focus:ring-0' type='text' placeholder='Search...'
          />
        </div>

        <div className='flex items-center mr-4 gap-4'>

          <div className='flex flex-row items-center justify-center gap-2 '>
            <button
              onClick={canCreatePosts}
              className='flex gap-1 border border-gray-200 text-gray-500 cursor-pointer hover:bg-gray-300 rounded transition-colors duration-300 p-2'>
              {plusIcon} <span className='font-semibold'>Create posts</span>
            </button>
          </div>

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
                    className='flex flex-row justify-center gap-2  border-b border-gray-200 text-gray-500 cursor-pointer hover:bg-gray-300 rounded transition-colors duration-300'
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

        <Modal
          title={'Create Post'}
          open={modalCreatePost}
          setOpen={setModalCreatePost}
          children={
            <CreatePost />
          }
          x_icon={true}
        />

        <Toaster />

      </div>}
    </>
  )
}