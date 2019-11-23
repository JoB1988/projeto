import { createAction, props } from '@ngrx/store';

export enum Action {
    PokemonsLoad = '[Pokemons] Load',
    PokemonsLoadSuccess = '[Pokemons] Load Success',
    PokemonsLoadError = '[Pokemons] Load Error',
    PokemonLoadByQuantity = '[Pokemon] Load By Quantity',
    PokemonLoadByQuantitySuccess = '[Pokemon] Load By Quantity Success',
    PokemonLoadByQuantityError = '[Pokemon] Load By Quantity Error',
}

export const PokemonsLoad = createAction(Action.PokemonsLoad);
export const PokemonsLoadSuccess = createAction(Action.PokemonsLoadSuccess, props<{ payload: Array<any> }>());
export const PokemonsLoadError = createAction(Action.PokemonsLoadError, props<{ payload: any }>());
export const PokemonLoadByQuantity = createAction(Action.PokemonLoadByQuantity, props<{ payload: { initial: number, final: number }}>());
export const PokemonLoadByQuantitySuccess = createAction(Action.PokemonLoadByQuantitySuccess, props<{ payload: Array<any> }>());
export const PokemonLoadByQuantityError = createAction(Action.PokemonsLoadError, props<{ payload: any }>());
