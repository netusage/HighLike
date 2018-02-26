import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { PersonModel } from '../models/person-model';
import { PersonQuery } from '../models/person-query-model';
import { ProfileModel } from '../models/profile-model';
import { ProfileQuery } from '../models/profile-query-model';

@Injectable()
export class LoadDataService {

  private peopleSubj$: BehaviorSubject<Array<PersonModel>>;
  private profileSubj$: BehaviorSubject<Array<ProfileModel>>;

   constructor(private http: HttpClient) {
     this.peopleSubj$ = new BehaviorSubject<Array<PersonModel>>(undefined);
     this.profileSubj$ = new BehaviorSubject<Array<ProfileModel>>(undefined);
    }

    public get people$(): Observable<Array<PersonModel>> {
      return this.peopleSubj$ as Observable<Array<PersonModel>>;
    }

    public get profile$(): Observable<Array<ProfileModel>> {
      return this.profileSubj$ as Observable<Array<ProfileModel>>;
    }

    /*public getJSON() {
        this.http.get("./assets/peopleMock.json").subscribe((data: Array<PersonModel>) => {
          this.peopleSubj$.next(data);
        });
    }*/

    public postJSON(candidateParams: PersonQuery) {
      this.http.post("http://localhost:3000/api/person/getMatches", {
        candidateParams
      }).subscribe((data: Array<PersonModel>) => {
        this.peopleSubj$.next(data);
      });
    }

    public generateProfile(profileQuery: ProfileQuery) {
      this.http.post("http://localhost:3000/api/profile/generate", {
        profileQuery
      }).subscribe((data: Array<ProfileModel>) => {
        this.profileSubj$.next(data);
      });
    }
  }