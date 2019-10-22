import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../app.store';
import * as fromPokemons from './pokemons.store';
import { PokemonsLoadLimited, PokemonsLoadAll } from './pokemons.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit, OnDestroy {

  public pokemons: Array<any> = [];
  public readonly pokemonsSubscription = this.store.pipe(select(fromPokemons.pokemons)).subscribe((pokemons) => {
    if (!pokemons) {
      return;
    }
    this.pokemons = pokemons;
  });

  constructor(private readonly store: Store<fromRoot.AppState>) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.pokemonsSubscription.unsubscribe();
  }

  load() {
    const limit = 30;
    this.store.dispatch(PokemonsLoadAll());
  }

}
