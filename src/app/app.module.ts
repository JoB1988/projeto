import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { PokemonsModule } from './pokemons/pokemons.module';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsEffects } from './pokemons/pokemons.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([PokemonsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    PokemonsModule,
    AppRoutingModule,
    CadastroModule,
    HomeModule,
    PageNotFoundModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
