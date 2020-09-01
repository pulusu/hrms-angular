import { Injectable } from '@angular/core';
import { Student } from './student';
import { User } from './user';
import { Client } from './client';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

endpoint: string = 'http://localhost:8000/students';
apiservice: string = 'http://localhost:8000';
 // endpoint: string = 'api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add student
  AddStudent(data: Student): Observable<any> {
    let API_URL = `${this.endpoint}/add-student`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all students
  GetStudents() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get student
  GetStudent(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-student/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update student
  UpdateStudent(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update-student/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete student
  DeleteStudent(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-student/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
    // Add Client
  AddClient(data: User): Observable<any> {
      let API_URL = `${this.apiservice}/clients/add-client`;
      return this.http.post(API_URL, data)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Get all Client
  GetClients() {
      return this.http.get(`${this.apiservice}/clients`);
    }
  
    // Get Client
  GetClient(id): Observable<any> {
      let API_URL = `${this.apiservice}/clients/read-client/${id}`;
      return this.http.get(API_URL, { headers: this.headers })
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
  
    // Update Client
  UpdateClient(id, data): Observable<any> {
      let API_URL = `${this.apiservice}/clients/update-client/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers })
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Delete Client
  DeleteClient(id): Observable<any> {
      var API_URL = `${this.apiservice}/clients/delete-client/${id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
    // Add Client
    AddUser(data: User): Observable<any> {
      let API_URL = `${this.apiservice}/clients/add-client`;
      return this.http.post(API_URL, data)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Get all users
  GetUsers() {
      return this.http.get(`${this.apiservice}/users`);
    }
  
    // Get User
  GetUser(id): Observable<any> {
      let API_URL = `${this.apiservice}/users/read-user/${id}`;
      return this.http.get(API_URL, { headers: this.headers })
        .pipe(
          map((res: Response) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }
  
    // Update User
  UpdateUser(id, data): Observable<any> {
      let API_URL = `${this.apiservice}/users/update-user/${id}`;
      return this.http.put(API_URL, data, { headers: this.headers })
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  
    // Delete User
  DeleteUser(id): Observable<any> {
      var API_URL = `${this.apiservice}/users/delete-user/${id}`;
      return this.http.delete(API_URL)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}