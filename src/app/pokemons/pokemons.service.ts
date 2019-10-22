import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';



@Injectable()
export class PokemonsService {

    constructor(private http: HttpClient) {

    }

    public read(): Observable<Array<any>> | undefined {
        return this.http.get<any>('https://pokeapi.co/api/v2/pokemon').pipe(
            map((response: any) => response.results),
            catchError((msg: any) => msg)
        );
    }
}
