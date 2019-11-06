import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';

const PRAGMA = 'pragma';
const NO_CACHE = 'no-cache';
const CACHE_CONTROL = 'Cache-Control';
const URL = 'https://pokeapi.co/api/v2/';

@Injectable({
    providedIn: 'root'
})
export class PokemonsService {

    public loadPokemonByQuantity$: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor(private http: HttpClient) { }

    public getAllPokemons(): Observable<any> {
        const headers = new HttpHeaders({ CACHE_CONTROL: NO_CACHE, PRAGMA: NO_CACHE });
        return this.http.get<any>(URL + 'pokemon?limit=1000&offset=0', { headers }).pipe(
            map((response: any) => response.results),
            catchError((msg: any) => msg)
        );
    }

    public loadPokemonByQuantity(initial: number, final: number): Observable<any> {
        const callArray = [];
        const headers = new HttpHeaders({ CACHE_CONTROL: NO_CACHE, PRAGMA: NO_CACHE });
        for (let index = initial; index <= final; index++) {
            callArray.push(this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${index}`, { headers }));
        }
        return forkJoin(callArray);
    }

}
