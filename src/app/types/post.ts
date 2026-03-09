export type PostProps = {
    id?: number;
    title: string;
    content: string;
    authorUserId: number;
    url_image?: string;
    created_at?: string;
    status?: number;
    user?: {
        first_name: string;
        last_name: string;
        avatar: string;
    }
}

export type PostParams = {
    userName?: string;
    title?: string;
    order?: 'ASC' | 'DESC';
}