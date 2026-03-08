declare global {
    type OptionsProps = {
        url: string,        
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        data?: any,
        body?: any,
        headers?: any,
        params?: any
    }
    type FetchPayload = {
        token?: string,
        params?: Params
    }
}

export { }