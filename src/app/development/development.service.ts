import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DevelopmentService {
    constructor(private http: HttpClient) { }

    public getCards(): Observable<Array<any>> | undefined {
        return this.http.get<any>('localhost:3000/cards');
    }

}
