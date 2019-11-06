import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { PokemonsService } from './pokemons.service';
import {
    Action,
    PokemonsLoadError,
    PokemonsLoadSuccess,
    PokemonLoadByQuantityError,
    PokemonLoadByQuantitySuccess
} from './pokemons.actions';
import { initial } from './pokemons.store';

@Injectable()
export class PokemonsEffects {

    loadAllPokemons$ = createEffect(() => this.actions$.pipe(
        ofType(Action.PokemonsLoad),
        switchMap((payload) => {
            return this.pokemonsService.getAllPokemons()
                .pipe(
                    map(pokemons => (PokemonsLoadSuccess({ payload: pokemons }))),
                    catchError((msg) => of(PokemonsLoadError({ payload: msg }))),
                );
        })
    )
    );

    loadPokemonByQuantity$ = createEffect(() => this.actions$.pipe(
        ofType(Action.PokemonLoadByQuantity),
        switchMap((payload) => {
            return this.pokemonsService.loadPokemonByQuantity(payload['payload']['initial'], payload['payload']['final'])
                .pipe(
                    map(pokemons => (PokemonLoadByQuantitySuccess({ payload: pokemons }))),
                    catchError((msg) => of(PokemonLoadByQuantityError({ payload: msg }))),
                );
        })
    )
    );

    success$ = createEffect(() => this.actions$.pipe(
        ofType<{ type: string, payload: any }>(
            // Action.PokemonsLoadSuccess,
            // Action.PokemonLoadByQuantitySuccess,
        ),
        tap(({ type, payload }) => { window.alert('Sucesso'); })
    ), { dispatch: false });

    error$ = createEffect(() => this.actions$.pipe(
        ofType<{ type: string, payload: string }>(
            Action.PokemonsLoadError,
            Action.PokemonLoadByQuantityError,
        ),
        tap(({ type, payload }) => { window.alert('Erro'); }),
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private pokemonsService: PokemonsService
    ) { }
}
