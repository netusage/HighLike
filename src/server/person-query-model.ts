export class ProfileQuery {
  city: number = 10;
  education: number = 10;
  company: number = 10;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}