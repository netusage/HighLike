export class PersonQuery {
 
    city: string;
    experience_years_from: number;
    experience_years_to: number;
    education: string;
    company: string;

    // constructor(city: string = "") {
    //   //Constructor initialization
    //   this.city = city;

       constructor(values: Object = {}) {
         //Constructor initialization
         Object.assign(this, values);
  }
 
}