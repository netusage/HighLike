import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { PersonModel } from '../models/person-model';

@Injectable()
export class LoadDataService {

  private peopleSubj$: BehaviorSubject<Array<PersonModel>>;

   constructor(private http: HttpClient) {
     this.peopleSubj$ = new BehaviorSubject<Array<PersonModel>>(undefined);
    }

    public get people$(): Observable<Array<PersonModel>> {
      return this.peopleSubj$ as Observable<Array<PersonModel>>;
    }

    public getJSON() {
        this.http.get("./assets/peopleMock.json").subscribe((data: Array<PersonModel>) => {
          this.peopleSubj$.next(data);
        });
    }
  }