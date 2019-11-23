import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../app.store';
import * as fromPokemons from './pokemons.store';
import { PokemonsLoad, PokemonLoadByQuantity } from './pokemons.actions';
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
  displayedColumns: string[] = ['id', 'name', 'image', 'shinyform', 'ellipsis'];

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

  ngOnInit() {
    this.store.dispatch(PokemonsLoad());
    this.loadPokemonByQuantity();
  }

  loadPokemonByQuantity() {
    this.searchByQuantityInitial$
      .pipe(withLatestFrom(this.searchByQuantityfinal$), take(1))
      .subscribe(([initialNumber, finalNumber]) => {
        if (initialNumber === 0 && finalNumber === 0) {
          return;
        }
        this.store.dispatch(PokemonLoadByQuantity({ payload: { initial: initialNumber, final: finalNumber } }));
      });
  }

  ngOnDestroy(): void {
    this.pokemonsSubscription.unsubscribe();
  }

  openDialog(pokemon): void {
    console.log(pokemon)
    console.log(this.dataSource.data)
    const dialogRef = this.dialog.open(PokemonComponent, {
      width: '250px',
      data: pokemon
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
