import { CadastroComponent } from './cadastro.component';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CadastroService } from './cadastro.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = undefined;

@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(options)
  ],
  exports: [CadastroComponent],
  providers: [CadastroService, MatDatepickerModule, {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, ]
})
export class CadastroModule { }
