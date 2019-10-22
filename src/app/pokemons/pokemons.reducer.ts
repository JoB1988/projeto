import { Action, createReducer, on } from '@ngrx/store';
import * as pokemonsActions from '../pokemons/pokemons.actions';
import { keyBy } from 'lodash';

export interface PokemonsState {
    pokemons: Array<any>;
}

export const pokemonsInitialState: PokemonsState = {
    pokemons: []
};

const pokemonsReducer = createReducer(
    pokemonsInitialState,
    on(pokemonsActions.PokemonsLoadSuccess, (state, {payload}) => (
            {
                ...state,
                pokemons: { ...state.pokemons, payload}
            }
        )
    ),
);

export function reducer(pokemonState: PokemonsState | undefined, action: Action) {
    return pokemonsReducer(pokemonState, action);
}

export const pokemonsFeatureKey = 'Pokemons';
