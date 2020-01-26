import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Cadastro } from './cadastro';

const PRAGMA = 'pragma';
const NO_CACHE = 'no-cache';
const CACHE_CONTROL = 'Cache-Control';
const URL = 'https://viacep.com.br/ws/';
const URLPOST = 'http://localhost:3000/forms';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {

    constructor(private http: HttpClient) { }

    public getAddress(cepAddress: string): Observable<any> {
        const headers = new HttpHeaders({ CACHE_CONTROL: NO_CACHE, PRAGMA: NO_CACHE });
        return this.http.get<any>(`${URL + cepAddress}/json/`).pipe(
            map((response: any) => response),
            catchError((msg: any) => msg)
        );
    }

    public saveForm(cadastro: Cadastro): Observable<any> {
        return this.http.post<any>(URLPOST, cadastro).pipe(
            map((response: any) => response),
            catchError((msg: any) => msg)
        );
    }

}
