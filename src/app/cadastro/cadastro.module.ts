import { CadastroComponent } from './cadastro.component';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CadastroService } from './cadastro.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    MatIconModule,
    NgxMaskModule.forRoot(options),
    NgxSpinnerModule
  ],
  exports: [CadastroComponent],
  providers: [
    CadastroService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class CadastroModule { }
