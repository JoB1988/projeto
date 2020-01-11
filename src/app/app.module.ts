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
import { CepComponent } from './cep/cep.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CepComponent, PageNotFoundComponent, HomeComponent],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([PokemonsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    PokemonsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
