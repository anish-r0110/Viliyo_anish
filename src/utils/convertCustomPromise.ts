import axios, { AxiosResponse, AxiosError } from 'axios';



export default function convertAxiosPromise<T>(axiosPromise: Promise<AxiosResponse<T>>): Promise<T> {
    return axiosPromise.then((response: AxiosResponse<T>) => response.data);
}