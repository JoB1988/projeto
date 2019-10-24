import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { PokemonsService } from './pokemons.service';
import { PokemonsLoadSuccess, PokemonsLoadError, Action, PokemonLoadSuccess, PokemonLoadError } from './pokemons.actions';

@Injectable()
export class PokemonsEffects {

    loadAllPokemons$ = createEffect(() => this.actions$.pipe(
        ofType(Action.PokemonsLoadAll),
        switchMap(() => {
            return this.pokemonsService.getAllPokemons()
                .pipe(
                    map(pokemons => (PokemonsLoadSuccess({ payload: pokemons }))),
                    catchError((msg) => of(PokemonsLoadError({ payload: msg }))),
                );
            })
        )
    );

    loadPokemon$ = createEffect(() => this.actions$.pipe(
        ofType(Action.PokemonLoad),
        switchMap((payload) => {
            console.log(payload['payload'])
            return this.pokemonsService.getPokemon(payload['payload'])
                .pipe(
                    map(pokemons => (PokemonLoadSuccess({ payload: pokemons }))),
                    catchError((msg) => of(PokemonLoadError({ payload: msg }))),
                );
            })
        )
    );

    success$ = createEffect(() => this.actions$.pipe(
        ofType<{ type: string, payload: any }>(
            Action.PokemonsLoadSuccess,
            Action.PokemonLoadSuccess,
        ),
        tap(({ type, payload }) => { window.alert(type); })
    ), { dispatch: false });

    error$ = createEffect(() => this.actions$.pipe(
        ofType<{ type: string, payload: string }>(
            Action.PokemonsLoadError,
            Action.PokemonLoadError,
        ),
        tap(({ type, payload }) => { window.alert(type); }),
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private pokemonsService: PokemonsService
    ) { }
}
