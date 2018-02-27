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
  private peopleInProgressSubj$: BehaviorSubject<boolean>;
  private profileInProgressSubj$: BehaviorSubject<boolean>;

   constructor(private http: HttpClient) {
     this.peopleSubj$ = new BehaviorSubject<Array<PersonModel>>(undefined);
     this.profileSubj$ = new BehaviorSubject<Array<ProfileModel>>(undefined);
     this.peopleInProgressSubj$ = new BehaviorSubject<boolean>(false);
     this.profileInProgressSubj$ = new BehaviorSubject<boolean>(false);
    }

    public get people$(): Observable<Array<PersonModel>> {
      return this.peopleSubj$ as Observable<Array<PersonModel>>;
    }

    public get profile$(): Observable<Array<ProfileModel>> {
      return this.profileSubj$ as Observable<Array<ProfileModel>>;
    }

    public get peopleInProgress$(): Observable<boolean> {
      return this.peopleInProgressSubj$ as Observable<boolean>;
    }

    public get profileInProgress$(): Observable<boolean> {
      return this.profileInProgressSubj$ as Observable<boolean>;
    }

    /*public getJSON() {
        this.http.get("./assets/peopleMock.json").subscribe((data: Array<PersonModel>) => {
          this.peopleSubj$.next(data);
        });
    }*/

    public postJSON(candidateParams: PersonQuery) {
<<<<<<< HEAD
      this.http.post("http://localhost:3000/api/person/Matches", {
=======
      this.peopleInProgressSubj$.next(true);
      this.http.post("http://localhost:3000/api/person/getMatches", {
>>>>>>> 9ec496992d1eb40ba86a09ff8e37bf3c2e45f6e1
        candidateParams
      }).subscribe((data: Array<PersonModel>) => {
        this.peopleSubj$.next(data);
        this.peopleInProgressSubj$.next(false);
      }, error => {
        console.log(error);
        this.peopleInProgressSubj$.next(false);
      });
    }

    public generateProfile(profileQuery: ProfileQuery) {
      this.profileInProgressSubj$.next(true);
      this.http.post("http://localhost:3000/api/profile/generate", {
        profileQuery
      }).subscribe((data: Array<ProfileModel>) => {
        this.profileSubj$.next(data);
        this.profileInProgressSubj$.next(false);
      }, error => {
        console.log(error);
        this.profileInProgressSubj$.next(false);
      });
    }
  }