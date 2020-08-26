export interface Sort {
    [key: string]: 1 | -1;
}

export interface Page<T> {
    content: T[];
    elements: number;
    page: number;
    limit: number;
    totalPages: number;
    totalElements: number;
    firstPage: boolean;
    lastPage: boolean;
    sort?: Sort;
}