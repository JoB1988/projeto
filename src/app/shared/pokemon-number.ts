import { SimplePokemon } from '../pokemons/pokemons';

const REGEX = /(\d+)(?!.*\d)/;

export class PokemonNumber {
    public static pokemonNumber(pokemons: Array<SimplePokemon>): Array<SimplePokemon> {
        const formatedPokemonArray: Array<SimplePokemon> = [];
        pokemons.forEach(pokemon => {
            // tslint:disable-next-line: radix
            pokemon.id  = parseInt(pokemon.url.match(REGEX)[1]);
            formatedPokemonArray.push(pokemon);
        });
        return formatedPokemonArray;
    }

    public static nextSearch(final, quantityOfAllPokemons, nextSearch): number {
        let nextNumber: number;
        if (quantityOfAllPokemons >= final + nextSearch) {
            nextNumber = final + nextSearch;
        } else if ((final + nextSearch) - quantityOfAllPokemons <= nextSearch) {
            nextNumber = final + ((final + nextSearch) - quantityOfAllPokemons);
        } else {
            nextNumber = 0;
        }
        return nextNumber;
    }
}
