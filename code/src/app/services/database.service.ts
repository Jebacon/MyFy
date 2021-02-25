import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:4200/api/database';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private http: HttpClient) {}

    get(username: string, password: string): Observable<User> {
        return this.http.get('${baseUrl}/${username}/${password}');
    }

    create(data: User): Observable<any> {
        return this.http.post(baseUrl,data);
    }

    delete(data: User): Observable<any> {
        return this.http.delete('${baseUrl}/${User}');
    }
}