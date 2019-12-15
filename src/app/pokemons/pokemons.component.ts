import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../app.store';
import * as fromPokemons from './pokemons.store';
import { PokemonsLoad, PokemonLoadByQuantity, PokemonsSetFavorite } from './pokemons.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { withLatestFrom, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PokemonComponent } from './pokemon/pokemon.component';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'image', 'shinyform', 'favorite', 'ellipsis'];

  public arrayFavoritePokemon: Array<number>;
  public dataSource: MatTableDataSource<Array<any>>;
  public readonly searchByQuantityInitial$ = this.store.pipe(select(fromPokemons.initial));
  public readonly searchByQuantityfinal$ = this.store.pipe(select(fromPokemons.final));
  public readonly isLoading$ = this.store.pipe(select(fromPokemons.isLoading));
  public readonly pokemonsSubscription = this.store.pipe(select(fromPokemons.pokemons)).subscribe(pokemons => {
    if (!pokemons || pokemons.length === 0) {
      return;
    }
    this.dataSource = new MatTableDataSource(pokemons);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });

  constructor(private readonly store: Store<fromRoot.AppState>, public dialog: MatDialog) { }

  public ngOnInit() {
    this.store.dispatch(PokemonsLoad());
    this.loadPokemonByQuantity();
  }

  public loadPokemonByQuantity() {
    this.searchByQuantityInitial$
      .pipe(withLatestFrom(this.searchByQuantityfinal$), take(1))
      .subscribe(([initialNumber, finalNumber]) => {
        if (initialNumber === 0 && finalNumber === 0) {
          return;
        }
        this.store.dispatch(PokemonLoadByQuantity({ payload: { initial: initialNumber, final: finalNumber } }));
      });
  }

  public ngOnDestroy(): void {
    this.pokemonsSubscription.unsubscribe();
  }

  public openDialog(pokemon): void {
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '600px', height: '400px',
      data: pokemon
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  public favoritePokemon(pokemonId, pokemonName) {
    this.store.dispatch(PokemonsSetFavorite({ payload: { id: pokemonId, name: pokemonName } }));
  }

}
