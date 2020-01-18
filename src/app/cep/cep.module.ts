import { CepComponent } from './cep.component';
import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CepService } from './cep.service';

@NgModule({
  declarations: [
    CepComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [CepComponent],
  providers: [CepService]
})
export class CepModule { }
