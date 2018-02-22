import { Observable } from 'rxjs';

export class LoadDataServiceMock {

    public getJSON(): Observable<any> {
        const json = {
            "People": [
                { "first_name": "יאיר", "last_name": "לוי", "email": "mruiz11@clickbank.net", "country": "ישראל", "city": "הרצליה", "education": "תוכנה", "company": "ECI", "position": "Developer", "experience_years": "3", "modified": "2015-06-19" }
            ]
        };
        return Observable.of(json);
    }

}