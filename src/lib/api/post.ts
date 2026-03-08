import { API_BASE_URL } from '@/src/lib/api/config'
import { FetchApi } from './fetchApi';

export async function getPosts(token: string) {

    const options: OptionsProps = {
        url: `${API_BASE_URL}/posts`,
        method: 'GET' as const,
        headers: {
            Authorization: 'bearer ' + token,
        },
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }
}