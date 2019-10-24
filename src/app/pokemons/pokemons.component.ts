import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../app.store';
import * as fromPokemons from './pokemons.store';
import { PokemonsLoadLimited, PokemonsLoadAll, PokemonLoad } from './pokemons.actions';
import { take } from 'rxjs/operators';
import { keyBy } from 'lodash';
import { PokemonNumber } from '../shared/pokemon-number';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Pokemon {
  name: string;
  number: number;
  ulr: string;
}

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['number', 'name'];
  public dataSource = new MatTableDataSource<any>(undefined);
  public initialPokemon = 0;
  public finalPokemon = 11;
  public readonly pokemonsSubscription = this.store.pipe(select(fromPokemons.pokemons)).subscribe((pokemons) => {
    if (!pokemons) {
      return;
    }
    this.dataSource = new MatTableDataSource(pokemons);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  });
  array = [
    { number: 1, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 2, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 3, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 4, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 5, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 6, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 7, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 8, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 9, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 10, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 11, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 12, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 13, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 14, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 15, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 16, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 17, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 18, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 19, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { number: 20, name: 'oi', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  ];

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
    this.store.dispatch(PokemonLoad({ payload: pokemonNumber }));
  }
}
