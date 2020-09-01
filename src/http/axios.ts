import axios, { AxiosInstance, AxiosResponse } from "axios";
import { dateTimeReviver } from "../util/date.util";
import { HttpResponse } from "./http";

export interface HttpResponseOptions {
    reviveDates?: boolean;
}

export function createAxiosInstance(): AxiosInstance {
    return axios.create();
}

export function getHttpResponse<T>(response: AxiosResponse<T>, options: HttpResponseOptions = {}): HttpResponse<T> {
    let body: any = response.data;
    if(options.reviveDates) {
        body = JSON.parse(JSON.stringify(body), dateTimeReviver);
    }
    return {
        status: response.status,
        headers: response.headers,
        body: body,
    };
}
