import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    MatToolbarModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
