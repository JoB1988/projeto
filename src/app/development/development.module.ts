import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DevelopmentComponent } from './development.component';
import { DevelopmentService } from './development.service';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DevelopmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [DevelopmentService],
  exports: [DevelopmentComponent]
})
export class DevelopmentModule { }



