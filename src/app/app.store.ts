
import { PokemonsState } from './pokemons/pokemons.reducer';

export interface AppState {
    Pokemons: PokemonsState;
}

export const getAppState = (state: AppState) => state.Pokemons;
