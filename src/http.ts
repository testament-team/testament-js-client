export class StatusError extends Error {
    constructor(message: string, public response: HttpResponse<any>) {
        super(message);
        Object.setPrototypeOf(this, StatusError.prototype);
    }
}

export interface HttpResponse<T> {
    status: number;
    headers: { [key: string]: string };
    data: T;
}