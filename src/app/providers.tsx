'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import Header from './components/ui/header'
import { Provider } from 'react-redux'
import { store } from './store'
import Toast from './components/ui/toast'

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>
                <Toast />
                <Header />
                {children}
            </SessionProvider>
        </Provider>
    )
}