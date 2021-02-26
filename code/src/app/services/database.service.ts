import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private http: HttpClient) {}

    //generalized http get method
    get(data: string): Observable<User> {
        return this.http.get(baseUrl+data);
    }
    //generalized http post method
    post(data: string): Observable<any> {
        return this.http.post(baseUrl+data,"");
    }
    //generalized http delete method
    delete(data: User): Observable<any> {
        return this.http.delete(baseUrl+"delete/"+data.email+"&"+data.password);
    }
}