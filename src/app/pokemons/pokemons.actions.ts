import { createAction, props } from '@ngrx/store';
import { SimplePokemon } from './pokemons';

export enum Action {
    PokemonsLoad = '[Pokemons] Load',
    PokemonsLoadSuccess = '[Pokemons] Load Success',
    PokemonsLoadError = '[Pokemons] Load Error',
    PokemonsFavoriteLoad = '[Pokemons] Load Favorite',
    PokemonsLoadFavoriteSuccess = '[Pokemons] Load Favorite Success',
    PokemonsLoadFavoriteError = '[Pokemons] Load Favorite Error',
    PokemonsSetFavorite = '[Pokemons] Set Favorite',
    PokemonsSetFavoriteSuccess = '[Pokemons] Set Favorite Success',
    PokemonsSetFavoriteError = '[Pokemons] Set Favorite Error',
    PokemonLoadByQuantity = '[Pokemon] Load By Quantity',
    PokemonLoadByQuantitySuccess = '[Pokemon] Load By Quantity Success',
    PokemonLoadByQuantityError = '[Pokemon] Load By Quantity Error',
}

export const PokemonsLoad = createAction(Action.PokemonsLoad);
export const PokemonsLoadSuccess = createAction(Action.PokemonsLoadSuccess, props<{ payload: Array<SimplePokemon> }>());
export const PokemonsLoadError = createAction(Action.PokemonsLoadError, props<{ payload: any }>());

export const PokemonsLoadFavorite = createAction(Action.PokemonsLoad);
export const PokemonsLoadFavoriteSuccess = createAction(Action.PokemonsLoadSuccess, props<{ payload: Array<number> }>());
export const PokemonsLoadFavoriteError = createAction(Action.PokemonsLoadError, props<{ payload: any }>());

export const PokemonsSetFavorite = createAction(Action.PokemonsSetFavorite, props<{ payload: number }>());
export const PokemonsSetFavoriteSuccess = createAction(Action.PokemonsSetFavoriteSuccess, props<{ payload: any }>());
export const PokemonsSetFavoriteError = createAction(Action.PokemonsSetFavoriteError, props<{ payload: any }>());

export const PokemonLoadByQuantity = createAction(Action.PokemonLoadByQuantity, props<{ payload: { initial: number, final: number }}>());
export const PokemonLoadByQuantitySuccess = createAction(Action.PokemonLoadByQuantitySuccess, props<{ payload: Array<any> }>());
export const PokemonLoadByQuantityError = createAction(Action.PokemonsLoadError, props<{ payload: any }>());
