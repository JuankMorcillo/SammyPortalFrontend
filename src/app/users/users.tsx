'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { useSession } from 'next-auth/react'
import Icons from '../components/ui/hooks/Icons';
import { clearProcessMessageUsers, fetchUsers, importUserSlice, selectLoadingUsers, selectUsersProcessMessage, selectUsersSuccess, setSuccessUsers } from '../store/slices/userSlice';
import Table from '../components/table';
import { user_columns } from './userColumns';
import { fillToastInfo } from '../store/slices/toastSlice';
import Modal from '../components/modal';
import UserDetail from './detail/page';

export default function Users() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectLoadingUsers)
    const message = useSelector(selectUsersProcessMessage)
    const success = useSelector(selectUsersSuccess)

    const [userData, setUserData] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
    })
    const [openModal, setOpenModal] = useState(false)

    const { downloadIcon, circleInfoIcon } = Icons({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })
    const { successIcon } = Icons({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Icons({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

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

    const importUser = async (data: any) => {
        if (session?.user.token) {
            await dispatch(
                importUserSlice(data)
            );
        }
    }

    useEffect(() => {

        if (message) {
            dispatch(fillToastInfo({
                id: new Date().getTime().toString(),
                message: message || 'User imported successfully',
                position: 'top-right',
                icon: success ? successIcon : circleXMarkIcon,
                duration: 3000,
            }))
            dispatch(clearProcessMessageUsers())
        }


        if (success) dispatch(setSuccessUsers(false))
    }, [message, success])

    const actions: Actions[] = [
        {
            name: 'View Info',
            icon: circleInfoIcon,
            action: (row) => {
                setUserData({
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    email: row.email,
                    avatar: row.avatar,
                })
                setOpenModal(true);
            }
        },
        {
            name: 'Import User',
            icon: downloadIcon,
            action: (row) => {
                const userData = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    email: row.email,
                    avatar: row.avatar,
                }
                importUser(userData);
            }
        },
    ]

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

            <Modal
                open={openModal}
                setOpen={setOpenModal}
                title={'User Detail'}
                children={
                    <UserDetail user={userData} />
                }
                x_icon={true}
            />

        </div>
    )
}