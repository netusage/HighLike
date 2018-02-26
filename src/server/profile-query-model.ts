export class ProfileQuery {
    city: number;
    education: number;
    company: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}