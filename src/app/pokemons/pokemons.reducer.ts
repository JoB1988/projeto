import { Action, createReducer, on } from '@ngrx/store';
import * as pokemonsActions from '../pokemons/pokemons.actions';
import { PokemonNumber } from '../shared/pokemon-number';
import { keyBy } from 'lodash';

export interface PokemonsState {
    pokemons: Array<any>;
    isLoading: boolean;
    initial: number;
    final: number;
    quantityOfAllPokemons: number;
    favorites: any;
}

export const pokemonsInitialState: PokemonsState = {
    pokemons: [],
    isLoading: false,
    initial: 1,
    final: 24,
    quantityOfAllPokemons: undefined,
    favorites: undefined
};

const pokemonsReducer = createReducer(
    pokemonsInitialState,
    on(pokemonsActions.PokemonsLoadSuccess, (state, { payload }) => (
        {
            ...state,
            pokemons: daw(payload),
            isLoading: false,
            quantityOfAllPokemons: payload.length
        }
    )
    ),
    on(pokemonsActions.PokemonLoadByQuantitySuccess, (state, { payload }) => (
        {
            ...state,
            pokemons: Object.assign([], state.pokemons, keyBy(payload, 'id')),
            isLoading: false,
            initial: PokemonNumber.nextSearch(state.final, state.quantityOfAllPokemons, 1),
            final: PokemonNumber.nextSearch(state.final, state.quantityOfAllPokemons, 12)
        }
    )
    ),
    on(pokemonsActions.PokemonsSetFavoriteSuccess, (state, { payload }) => (
        {
            ...state,
            favorites: state.favorites.concat(payload),
        }
    )
    ),
    on(pokemonsActions.PokemonsLoadFavoriteSuccess, (state, { payload }) => (
        {
            ...state,
            favorites: payload,
        }
    )
    ),
    on(pokemonsActions.PokemonsLoad, (state) => (
        {
            ...state,
            isLoading: true
        }
    )
    ),
    on(pokemonsActions.PokemonLoadByQuantity, (state) => (
        {
            ...state,
            isLoading: true
        }
    )
    )
);

export function reducer(pokemonState: PokemonsState | undefined, action: Action) {
    return pokemonsReducer(pokemonState, action);
}

export const pokemonsFeatureKey = 'Pokemons';

// tslint:disable-next-line: no-debugger
// tslint:disable-next-line: no-unused-expression
export function daw(any1, any2?): any {

    if(!any1 && !any2) {
        return
    }
    debugger
    const b = Object.assign([],keyBy(PokemonNumber.pokemonNumber(any1), 'id'))
    const a = Object.assign([], keyBy(any1, 'id'))


        // return a;
}