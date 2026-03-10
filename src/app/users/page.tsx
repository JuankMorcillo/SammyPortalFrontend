import React from 'react'
import Users from './users'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Users",
    description: "",
};

export default function page() {
    return (
        <Users />
    )
}