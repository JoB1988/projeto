import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../app.store';
import * as fromPokemons from './pokemons.store';
import { PokemonsLoadLimited, PokemonsLoadAll, PokemonLoad } from './pokemons.actions';
import { take } from 'rxjs/operators';
import { keyBy } from 'lodash';
import { PokemonNumber } from '../shared/pokemon-number';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonsComponent implements OnInit, OnDestroy {

  public pokemons: Array<any> = [];
  public initialPokemon = 0;
  public finalPokemon = 11;
  public readonly pokemonsSubscription = this.store.pipe(select(fromPokemons.pokemons)).subscribe((pokemons) => {
    if (!pokemons) {
      return;
    }
    this.pokemons = pokemons;
    for (let index = 1; index < 12; index++) {
      this.loadPokemon(index);
    }
  });

  constructor(private readonly store: Store<fromRoot.AppState>) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.pokemonsSubscription.unsubscribe();
  }

  loadAllPokemons() {
    this.store.dispatch(PokemonsLoadAll());
  }

  loadPokemon(pokemonNumber: number) {
    this.store.dispatch(PokemonLoad({payload: pokemonNumber}));
  }
}
