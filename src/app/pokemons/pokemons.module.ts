import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PokemonsComponent } from './pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { StoreModule } from '@ngrx/store';
import * as pokemonsReducer from './pokemons.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsEffects } from './pokemons.effects';
import { PokemonsService } from './pokemons.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    PokemonsComponent,
    PokemonComponent
  ],
  imports: [
    StoreModule.forFeature(pokemonsReducer.pokemonsFeatureKey, pokemonsReducer.reducer),
    EffectsModule.forFeature([PokemonsEffects]),
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [PokemonsService],
  exports: [PokemonsComponent]
})
export class PokemonsModule { }



