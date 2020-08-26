import axios, { AxiosInstance, AxiosResponse } from "axios";
import { HttpResponse } from "./http";

export function createAxiosInstance(): AxiosInstance {
    return axios.create();
}

export function getHttpResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
    return {
        status: response.status,
        headers: response.headers,
        data: response.data
    };
}
