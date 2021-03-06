import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://myfy.s3-website-us-east-1.amazonaws.com/';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private http: HttpClient) {}

    //generalized http get method
    get(data: any): Observable<any> {
        var send = JSON.stringify(data)
        return this.http.get(baseUrl);
    }
    //generalized http post method
    post(URL: string, data: object): Observable<any> {
        return this.http.post(baseUrl+URL,data);
    }
    //generalized http delete method
    delete(URL: string, data: object): Observable<any> {
        return this.http.delete(baseUrl+URL,data);
    }
}