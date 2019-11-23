import { keyBy } from 'lodash';

export class PokemonNumber {
    public static pokemonNumber(pokemons: Array<any>): Array<any> {
        const formatedPokemonArray = [];
        pokemons.forEach(pokemon => {
            if (pokemon['url']) {
                let num = pokemon['url'].substring(34, 40);
                const numIndex = parseInt(num.indexOf('/'));
                num = parseInt(num.substring(0, numIndex));
                pokemon['id'] = num;
                formatedPokemonArray.push(pokemon);
            } else {
                formatedPokemonArray.push(pokemon);
            }
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
