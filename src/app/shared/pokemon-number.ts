import { keyBy } from 'lodash';

export class PokemonNumber {
    public static pokemonNumber(pokemons: Array<any>): Array<any> {
        let formatedPokemonArray = [];
        pokemons.forEach(pokemon => {
            let num = pokemon['url'].substring(34, 40);
            const numIndex = parseInt(num.indexOf('/'));
            num = parseInt(num.substring(0, numIndex));
            pokemon['number'] = num;
            formatedPokemonArray.push(pokemon);
        });
        return formatedPokemonArray;
    }
}
