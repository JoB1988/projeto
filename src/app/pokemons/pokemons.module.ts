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

@NgModule({
  declarations: [
    PokemonsComponent,
    PokemonComponent
  ],
  imports: [
    StoreModule.forFeature(pokemonsReducer.pokemonsFeatureKey, pokemonsReducer.reducer),
    EffectsModule.forFeature([PokemonsEffects]),
    BrowserModule,
    HttpClientModule
  ],
  providers: [PokemonsService],
  exports:[PokemonsComponent]
})
export class PokemonsModule { }



