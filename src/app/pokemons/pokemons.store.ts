import { createSelector } from '@ngrx/store';
import { PokemonsState } from './pokemons.reducer';
import { AppState } from '../app.store';

export const selectPokemonsState = (appState: AppState) => appState.Pokemons;

export const pokemons = createSelector(selectPokemonsState, (pokemonsState: PokemonsState) => pokemonsState.pokemons);
