import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { PokemonsModule } from './pokemons/pokemons.module';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsEffects } from './pokemons/pokemons.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([PokemonsEffects]),
    PokemonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
