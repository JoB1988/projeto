import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { PokemonsModule } from './pokemons/pokemons.module';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsEffects } from './pokemons/pokemons.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CepComponent } from './cep/cep.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { CepModule } from './cep/cep.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PageNotFoundComponent],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([PokemonsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    PokemonsModule,
    MatToolbarModule,
    AppRoutingModule,
    HomeModule,
    CepModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
