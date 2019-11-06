import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { PokemonsModule } from './pokemons/pokemons.module';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsEffects } from './pokemons/pokemons.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([PokemonsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    PokemonsModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
