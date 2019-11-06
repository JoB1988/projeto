import { Action, createReducer, on } from '@ngrx/store';
import * as pokemonsActions from '../pokemons/pokemons.actions';
import { keyBy } from 'lodash';
import { PokemonNumber } from '../shared/pokemon-number';


export interface PokemonsState {
    pokemons: { [key: string]: any };
    isLoading: boolean;
    initial: number;
    final: number;
    quantityOfAllPokemons: number;
}

export const pokemonsInitialState: PokemonsState = {
    pokemons: {},
    isLoading: false,
    initial: 1,
    final: 24,
    quantityOfAllPokemons: undefined,
};

const pokemonsReducer = createReducer(
    pokemonsInitialState,
    on(pokemonsActions.PokemonsLoadSuccess, (state, { payload }) => (
        {
            ...state,
            pokemons: keyBy(PokemonNumber.pokemonNumber(payload), 'id'),
            isLoading: false,
            quantityOfAllPokemons: payload.length
        }
    )
    ),
    on(pokemonsActions.PokemonLoadByQuantitySuccess, (state, { payload }) => (
        {
            ...state,
            pokemons: keyBy( Object.values(state.pokemons).concat(payload), 'id'),
            isLoading: false,
            initial: PokemonNumber.nextSearch(state.final, state.quantityOfAllPokemons, 1),
            final: PokemonNumber.nextSearch(state.final, state.quantityOfAllPokemons, 12)
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
    ),
);

export function reducer(pokemonState: PokemonsState | undefined, action: Action) {
    return pokemonsReducer(pokemonState, action);
}

export const pokemonsFeatureKey = 'Pokemons';
