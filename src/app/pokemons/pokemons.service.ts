import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable()
export class PokemonsService {

    constructor(private http: HttpClient) {

    }

    public read(): Observable<Array<any>> | undefined {
        const headers = new HttpHeaders({
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        });
        return this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0', { headers }).pipe(
            map((response: any) => response.results),
            catchError((msg: any) => msg)
        );
    }
}
