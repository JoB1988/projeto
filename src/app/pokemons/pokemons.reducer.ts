import { Action, createReducer, on } from '@ngrx/store';
import * as pokemonsActions from '../pokemons/pokemons.actions';
import { keyBy } from 'lodash';
import { PokemonNumber } from '../shared/pokemon-number';

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
                pokemons: keyBy(PokemonNumber.pokemonNumber(payload), 'number')
            }
        )
    ),
    on(pokemonsActions.PokemonLoadSuccess, (state, {payload}) => (
            {
                ...state,
                pokemons: keyBy(payload, 'name')
            }
        )
    )
);

export function reducer(pokemonState: PokemonsState | undefined, action: Action) {
    return pokemonsReducer(pokemonState, action);
}

export const pokemonsFeatureKey = 'Pokemons';
