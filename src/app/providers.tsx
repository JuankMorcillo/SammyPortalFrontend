'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import Header from './components/ui/header'
import { Provider } from 'react-redux'
import { store } from './store'

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>
                <Header />
                {children}
            </SessionProvider>
        </Provider>
    )
}