import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
var APIServices = 'http://175.101.4.30:8700';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('hrms-kairos-currentTrackUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${APIServices}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(user.length!=0){
                     this.currentUserSubject.next(user);
                    return user;
                }else{
                    return user;
                }
            
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('hrms-kairos-currentTrackUser');
        this.currentUserSubject.next(null);
    }
}