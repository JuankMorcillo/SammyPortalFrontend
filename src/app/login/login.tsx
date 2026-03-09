'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Icons from '../components/ui/hooks/Icons';

export default function Login() {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter();

    const { loadingIcon } = Icons({ classNames: 'size-6 animate-spin', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const { lockIcon, openEyeIcon, closeEyeIcon } = Icons({ classNames: 'size-6', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                setError('Invalid credentials');
                setIsLoading(false);
            } else {
                router.push(`/`);                                
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred during sign in');
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-110 rounded-2xl shadow-2xl bg-white'>

            <form className="p-8 w-full max-w-md">

                <div className='flex justify-center'>
                    <div className='mb-4 text-blue-500 rounded-full bg-blue-100 p-4'>
                        {lockIcon}
                    </div>
                </div>

                <div className='flex flex-col items-center mb-8 text-center'>
                    <h1 className="flex justify-center text-2xl font-bold mb-4 text-black">
                        Welcome Back
                    </h1>

                    <div className="text-gray-500 font-bold">
                        Enter your credentials to access your portal
                    </div>

                </div>

                <div className="mb-4 text-black">
                    <div>
                        <label className="block mb-2 font-bold text-sm">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            placeholder='name@company.com'
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 hover:border-gray-400 transition-colors"
                        />
                    </div>
                    <div className='flex flex-col '>
                        <label className="block mb-2 font-bold text-sm">Password</label>
                        <div className='flex w-full items-stretch rounded-md mb-4'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                placeholder='********'
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-l-md border-r-0 hover:border-gray-400 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='flex items-center justify-center px-3 bg-gray-200 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-300 transition-colors'
                            >
                                {showPassword ? openEyeIcon : closeEyeIcon}
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>


                <div className='flex justify-center mb-2'>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white p-2 text-md font-bold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {isLoading ?
                            <div className='flex items-center justify-center gap-2'>
                                {loadingIcon}
                                Logging in...
                            </div>
                            : 'Sign In to Dashboard'}
                    </button>
                </div>

            </form>

        </div>
    )
}