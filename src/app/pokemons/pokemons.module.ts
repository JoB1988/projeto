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
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatIconModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [PokemonsService],
  exports: [PokemonsComponent],
  entryComponents: [PokemonComponent]
})
export class PokemonsModule { }
