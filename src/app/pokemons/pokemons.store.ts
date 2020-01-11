import { createSelector } from '@ngrx/store';
import { PokemonsState } from './pokemons.reducer';
import { AppState } from '../app.store';

export const selectPokemonsState = (appState: AppState) => appState.Pokemons;

export const pokemons = createSelector(selectPokemonsState, (pokemonsState: PokemonsState) => pokemonsState.pokemons);
export const pokemonId = createSelector(selectPokemonsState, (pokemonsState: PokemonsState) => pokemonsState.pokemons);
// tslint:disable-next-line: max-line-length
export const pokemonSelectedId = createSelector(selectPokemonsState, (pokemonsState: PokemonsState) => pokemonsState.pokemons[pokemonsState.pokemonSelectedId]);
export const favoritePokemon = createSelector(selectPokemonsState, (pokemonsState: PokemonsState) => pokemonsState.favorites);
export const isLoading = createSelector(selectPokemonsState, (pokemonsState: PokemonsState) => pokemonsState.isLoading);
export const initial = createSelector(selectPokemonsState, (pokemonsState: PokemonsState) => pokemonsState.initial);
export const final = createSelector(selectPokemonsState, (pokemonsState: PokemonsState) => pokemonsState.final);
