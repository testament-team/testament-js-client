export class StatusError extends Error {
    constructor(public response: HttpResponse<any>) {
        super(`Request failed with a status code ${response.status}:\n ${JSON.stringify(response, null, 4)}`);
        Object.setPrototypeOf(this, StatusError.prototype);
    }
}

export interface HttpResponse<T> {
    status: number;
    headers: { [key: string]: string };
    body: T;
}

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    NOT_FOUND = 400,
    CONFLICT = 409,
}