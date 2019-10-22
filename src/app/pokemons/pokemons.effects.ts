import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { PokemonsService } from './pokemons.service';
import { PokemonsLoadSuccess, PokemonsLoadError, Action } from './pokemons.actions';

@Injectable()
export class PokemonsEffects {

    loadPokemons$ = createEffect(() => this.actions$.pipe(
        ofType(Action.PokemonsLoadAll),
        switchMap(() => {
            return this.pokemonsService.read()
                .pipe(
                    map(pokemons => (PokemonsLoadSuccess({ payload: pokemons }))),
                    catchError((msg) => of(PokemonsLoadError({ payload: msg }))),
                );
            })
        )
    );

    success$ = createEffect(() => this.actions$.pipe(
        ofType<{ type: string, payload: any }>(
            Action.PokemonsLoadSuccess
        ),
        tap(({ type, payload }) => { window.alert(type); })
    ), { dispatch: false });

    error$ = createEffect(() => this.actions$.pipe(
        ofType<{ type: string, payload: string }>(
            Action.PokemonsLoadError
        ),
        tap(({ type, payload }) => { window.alert(type); }),
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private pokemonsService: PokemonsService
    ) { }
}
