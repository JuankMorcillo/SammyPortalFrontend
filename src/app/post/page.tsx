import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function page({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
}