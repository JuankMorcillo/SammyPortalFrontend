import { REQRES_API_URL } from '@/src/lib/api/config'
import { FetchApi } from './fetchApi';

export async function getUsers(params: Params) {

    const options: OptionsProps = {
        url: `${REQRES_API_URL}users`,
        method: 'GET' as const,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env.NEXT_PUBLIC_API_REQ_RES_KEY}`
        },
        params
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }
}