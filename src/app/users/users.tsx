'use client';

import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { useSession } from 'next-auth/react'
import Icons from '../components/ui/hooks/Icons';
import { fetchUsers } from '../store/slices/userSlice';
import Table from '../components/table';
import { user_columns } from './userColumns';

export default function Users() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const { downloadIcon } = Icons({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleFetchUsers = async (params: Params) => {
        if (session?.user.token) {
            const result = await dispatch(
                fetchUsers({ params: params })
            );
            return {
                meta: result.payload?.total || { total: 0 },
                data: result.payload?.data || [],
            };
        }
        return { meta: { total: 0 }, data: [] };
    }

    const actions: Actions[] = []

    const topActions: TopActions[] = []

    return (
        <div className='flex flex-col gap-4 w-full'>
            <h1 className='text-2xl font-bold mb-4'>Users</h1>
            <Table
                columns={user_columns}
                getInfo={handleFetchUsers}
                options={{ bd: true }}
                actions={actions}
                topActions={topActions}
            />
        </div>
    )
}