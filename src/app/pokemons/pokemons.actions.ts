import { createAction, props } from '@ngrx/store';

export enum Action {
    PokemonsLoadAll = '[Pokemons] Load All',
    PokemonsLoadLimited = '[Pokemons] Load Limited',
    PokemonsLoadSuccess = '[Pokemons] Load Success',
    PokemonsLoadError = '[Pokemons] Load Error',
    PokemonLoad = '[Pokemon] Load',
    PokemonLoadSuccess = '[Pokemon] Load Success',
    PokemonLoadError = '[Pokemon] Load Error',
}

export const PokemonsLoadAll = createAction(Action.PokemonsLoadAll);
export const PokemonsLoadLimited = createAction(Action.PokemonsLoadLimited, props<{payload: number}>());
export const PokemonsLoadSuccess = createAction(Action.PokemonsLoadSuccess, props<{payload: Array<any>}>());
export const PokemonsLoadError = createAction(Action.PokemonsLoadError, props<{payload: any}>());
export const PokemonLoad = createAction(Action.PokemonLoad, props<{payload: number}>());
export const PokemonLoadSuccess = createAction(Action.PokemonsLoadError, props<{payload: any}>());
export const PokemonLoadError = createAction(Action.PokemonsLoadError, props<{payload: any}>());
