import { API_BASE_URL } from '@/src/lib/api/config'
import { FetchApi } from './fetchApi';
import { PostParams, PostProps } from '@/src/app/types/post';

export async function getPosts(token: string, params: PostParams) {

    const options: OptionsProps = {
        url: `${API_BASE_URL}/posts`,
        method: 'GET' as const,
        headers: {
            Authorization: 'Bearer ' + token,
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

export async function getMyPosts(id: number, token: string, params: PostParams) {
                
    const options: OptionsProps = {
        url: `${API_BASE_URL}/posts/${id}`,
        method: 'GET' as const,
        headers: {
            Authorization: 'Bearer ' + token,
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

export async function createPost(token: string, data: PostProps) {

    const options: OptionsProps = {
        url: `${API_BASE_URL}/posts`,
        method: 'POST' as const,
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: data
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export async function updatePost(token: string, data: PostProps) {

    const options: OptionsProps = {
        url: `${API_BASE_URL}/posts/${data.id}`,
        method: 'PATCH' as const,
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: data
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}

