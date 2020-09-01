import * as moment from "moment";
import { ISO_8601 } from "moment";

export function isValidDate(date: string): boolean {
    const formats = [
        ISO_8601,
    ];
    return moment(date, formats, true).isValid();
}

export function dateTimeReviver(key: string, value: string): Date | string {
    if (typeof value === 'string' && isValidDate(value)) {
        return new Date(value);
    }
    return value;
}