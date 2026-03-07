import axios from "axios";

let status: number = 200;

export async function FetchApi(options: OptionsProps) {
    const { url, method, data, body, headers, params } = options;

    try {

        return await axios(url, {
            method,
            data: body || data,
            headers,
            params
        }).then(response => {        
            status = response.status;
            return response.data;
        }).catch(error => {
            status = error.response ? error.response.status : 500;
            console.error("FetchApi Error:", error);

            let message = ''

            if (error.response.data?.message instanceof Array) {
                message = error.response.data.message.join(', ');
                throw message
            }
            throw error.response?.data?.message || 'An error occurred during the API request';
        })

    } catch (error) {
        console.error("FetchApi Exception:", error);
        throw error;
    }

}