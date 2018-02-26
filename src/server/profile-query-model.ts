export class ProfileQuery {
    city: number;
    experience_years_from: number;
    experience_years_to: number;
    education: number;
    company: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}