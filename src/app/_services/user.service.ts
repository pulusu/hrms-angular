import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

var APIServices = 'ss';
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${APIServices}/users`);
    }

    register(user: User) {
        return this.http.post(`${APIServices}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${APIServices}/users/${id}`);
    }
}